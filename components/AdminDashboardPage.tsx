import React, { useContext, useState, useMemo, useEffect } from 'react';
import { Card, Modal, Button, Input, Select } from './ui';
import { AuthContext } from '../contexts/AuthContext';
import { MOCK_USERS } from '../constants';
import type { AuthContextType, User, UserRole, UserStatus } from '../types';

const UserManagementTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editedUser, setEditedUser] = useState<Partial<User>>({});

    const filteredUsers = useMemo(() => {
        return users
            .filter(user => {
                if (roleFilter === 'all') return true;
                return user.role === roleFilter;
            })
            .filter(user => {
                const term = searchTerm.toLowerCase();
                return (user.name?.toLowerCase().includes(term) || user.email?.toLowerCase().includes(term));
            });
    }, [users, searchTerm, roleFilter]);

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        setEditedUser({ role: user.role, status: user.status });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
        }
    };
    
    const handleSaveChanges = () => {
        if (!editingUser) return;
        setUsers(currentUsers => currentUsers.map(user => 
            user.id === editingUser.id ? { ...user, ...editedUser } : user
        ));
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleModalFieldChange = (field: keyof User, value: string) => {
        setEditedUser(prev => ({...prev, [field]: value }));
    };

    return (
        <Card>
            <h3 className="text-xl font-bold font-serif mb-4">User Management</h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input 
                    label="Search Users"
                    id="search-users"
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-auto flex-grow"
                />
                <Select
                    label="Filter by Role"
                    id="role-filter"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full sm:w-48"
                >
                    <option value="all">All Roles</option>
                    <option value="trader">Trader</option>
                    <option value="admin">Admin</option>
                </Select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="p-3 font-semibold">Name</th>
                            <th className="p-3 font-semibold">Email</th>
                            <th className="p-3 font-semibold">Role</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${user.status === 'active' ? 'bg-success/20 text-green-800' : 'bg-warning/20 text-yellow-800'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3 text-right">
                                    <button onClick={() => handleEditClick(user)} className="text-primary hover:underline font-semibold mr-4">Edit</button>
                                    <button onClick={() => handleDeleteClick(user.id)} className="text-danger hover:underline font-semibold">Delete</button>
                                </td>
                            </tr>
                        ))}
                         {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center p-6 text-gray-500">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Edit User: ${editingUser?.name}`}>
                {editingUser && (
                    <div className="space-y-4">
                         <Select
                            label="Role"
                            id="edit-role"
                            value={editedUser.role}
                            onChange={(e) => handleModalFieldChange('role', e.target.value)}
                        >
                            <option value="trader">Trader</option>
                            <option value="admin">Admin</option>
                        </Select>
                         <Select
                            label="Status"
                            id="edit-status"
                            value={editedUser.status}
                            onChange={(e) => handleModalFieldChange('status', e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                        </Select>
                        <div className="flex justify-end gap-4 mt-6">
                             <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                             <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </Card>
    )
}


const AdminDashboardPage: React.FC = () => {
    const { user } = useContext(AuthContext) as AuthContextType;

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-600">Welcome, {user?.email || 'Admin'}.</p>
                </div>

                <UserManagementTable />
            </div>
        </div>
    );
}

export default AdminDashboardPage;