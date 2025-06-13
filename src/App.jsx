import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

// --- Auth Context ---
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { username, role }
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username, password) => {
        // Mock authentication
        if (username === 'dev' && password === 'dev') {
            setUser({ username: 'dev', role: 'developer' });
            setIsAuthenticated(true);
            return true;
        } else if (username === 'manager' && password === 'manager') {
            setUser({ username: 'manager', role: 'manager' });
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// --- Components ---

// Login Page
const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (login(username, password)) {
            // Redirect will be handled by the parent App component based on isAuthenticated
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="bt-min-h-screen bt-flex bt-items-center bt-justify-center bt-bg-gray-100 bt-p-4">
            <div className="bt-bg-white bt-p-8 bt-rounded-xl bt-shadow-lg bt-w-full bt-max-w-md bt-border bt-border-gray-200">
                <h2 className="bt-text-3xl bt-font-extrabold bt-text-gray-900 bt-text-center bt-mb-6">
                    Bug/Task Tracker
                </h2>
                <form onSubmit={handleSubmit} className="bt-space-y-6">
                    <div>
                        <label htmlFor="username" className="bt-block bt-text-sm bt-font-medium bt-text-gray-700">
                            Username (dev/manager)
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="bt-mt-1 bt-block bt-w-full bt-px-4 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-focus-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="bt-block bt-text-sm bt-font-medium bt-text-gray-700">
                            Password (dev/manager)
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="bt-mt-1 bt-block bt-w-full bt-px-4 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-focus-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value.replace(/[^A-Za-z0-9]/g, ''))} // Sanitize password input
                        />
                    </div>
                    {error && <p className="bt-text-red-600 bt-text-sm">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="bt-w-full bt-flex bt-justify-center bt-py-2 bt-px-4 bt-border bt-border-transparent bt-rounded-lg bt-shadow-sm bt-text-lg bt-font-semibold bt-text-white bt-bg-blue-600 bt-hover-bg-blue-700 bt-focus-button bt-transition bt-duration-150 bt-ease-in-out"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Shared Icons (Lucide React)
const PlusIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5v14M5 12h14"/></svg>
);
const EditIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
);
const TrashIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/></svg>
);
const ClockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);
const XCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);
const CalendarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);
const ListIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
);
const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const TagIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414L15.172 22.172a4 4 0 0 0 5.656 0L22.172 19.828a4 4 0 0 0 0-5.656Z"/><path d="M7 7h.01"/></svg>
);
const TrendingUpIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const FilterIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const SortAscIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m17 11-5-5-5 5"/><path d="M12 18V6"/></svg>
);
const SortDescIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m17 13-5 5-5-5"/><path d="M12 6v12"/></svg>
);


// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="bt-fixed bt-inset-0 bt-bg-gray-600 bt-bg-opacity-50 bt-flex bt-items-center bt-justify-center bt-z-50 bt-p-4">
            <div className="bt-bg-white bt-rounded-xl bt-shadow-2xl bt-p-6 bt-w-full bt-max-w-lg bt-relative bt-transform bt-transition-all bt-scale-100 bt-opacity-100 bt-border bt-border-gray-200">
                <h3 className="bt-text-2xl bt-font-bold bt-text-gray-900 bt-mb-4 bt-pb-2 bt-border-b bt-border-gray-200">{title}</h3>
                <button
                    onClick={onClose}
                    className="bt-absolute bt-top-4 bt-right-4 bt-text-gray-400 bt-hover-text-gray-600 bt-transition bt-duration-150 bt-ease-in-out"
                >
                    <XCircleIcon className="bt-w-6 bt-h-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

// Confirmation Modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <p className="bt-text-gray-700 bt-mb-6">{message}</p>
            <div className="bt-flex bt-justify-end bt-space-x-3">
                <button
                    onClick={onClose}
                    className="bt-px-5 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-text-gray-700 bt-hover-bg-gray-50 bt-transition bt-duration-150 bt-ease-in-out"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="bt-px-5 bt-py-2 bt-bg-red-600 bt-text-white bt-rounded-lg bt-hover-bg-red-700 bt-transition bt-duration-150 bt-ease-in-out"
                >
                    Confirm
                </button>
            </div>
        </Modal>
    );
};


// Task Form for Creation/Editing
const TaskForm = ({ task, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || 'Medium',
        assignee: task?.assignee || 'dev', // Default assignee for a new task
        dueDate: task?.importantDates?.dueDate || new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                priority: task.priority,
                assignee: task.assignee,
                dueDate: task.importantDates?.dueDate || '',
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            ...task,
            id: task?.id || `task-${Date.now()}`,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: task?.status || 'Open',
            assignee: formData.assignee,
            importantDates: {
                createdDate: task?.importantDates?.createdDate || new Date().toISOString().split('T')[0],
                dueDate: formData.dueDate,
                closedDate: task?.importantDates?.closedDate || null,
            },
            timeSpent: task?.timeSpent || 0,
            history: task?.history || [],
        };
        onSubmit(newTask);
    };

    return (
        <form onSubmit={handleSubmit} className="bt-space-y-4">
            <div>
                <label htmlFor="title" className="bt-block bt-text-sm bt-font-medium bt-text-gray-700">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="bt-mt-1 bt-block bt-w-full bt-px-3 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-focus-input"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="bt-block bt-text-sm bt-font-medium bt-text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="bt-mt-1 bt-block bt-w-full bt-px-3 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-focus-input"
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="priority" className="bt-block bt-text-sm bt-font-medium bt-text-gray-700">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="bt-mt-1 bt-block bt-w-full bt-px-3 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-focus-input"
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div>
                <label htmlFor="assignee" className="bt-block bt-text-sm bt-font-medium bt-text-gray-700">Assignee</label>
                <input
                    type="text"
                    id="assignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    className="bt-mt-1 bt-block bt-w-full bt-px-3 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-focus-input"
                    required
                />
            </div>
            <div>
                <label htmlFor="dueDate" className="bt-block bt-text-sm bt-font-medium bt-text-gray-700">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="bt-mt-1 bt-block bt-w-full bt-px-3 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-focus-input"
                    required
                />
            </div>
            <div className="bt-flex bt-justify-end bt-space-x-3 bt-mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="bt-px-5 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-text-gray-700 bt-hover-bg-gray-50 bt-transition bt-duration-150 bt-ease-in-out"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bt-px-5 bt-py-2 bt-bg-blue-600 bt-text-white bt-rounded-lg bt-hover-bg-blue-700 bt-transition bt-duration-150 bt-ease-in-out"
                >
                    {task ? 'Update Task' : 'Create Task'}
                </button>
            </div>
        </form>
    );
};

// Task Item Display
const TaskItem = ({ task, onEdit, onDelete, onTimeTrack, onToggleClose, onApprove, onReopen, isManager }) => {
    const getStatusColorClass = (status) => {
        switch (status) {
            case 'Open':
                return 'bt-bg-blue-100 bt-text-blue-800';
            case 'Pending Approval':
                return 'bt-bg-yellow-100 bt-text-yellow-800';
            case 'Closed':
                return 'bt-bg-green-100 bt-text-green-800';
            default:
                return 'bt-bg-gray-100 bt-text-gray-800';
        }
    };

    const getPriorityColorClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'bt-text-red-600';
            case 'Medium':
                return 'bt-text-yellow-600';
            case 'Low':
                return 'bt-text-green-600';
            default:
                return 'bt-text-gray-600';
        }
    };

    return (
        <div className="bt-bg-white bt-rounded-xl bt-shadow-md bt-p-6 bt-border bt-border-gray-200 bt-flex bt-flex-col bt-md-flex-row bt-justify-between bt-items-start bt-md-items-center bt-mb-4 bt-last-mb-0">
            <div className="bt-flex-grow bt-mb-4 bt-md-mb-0">
                <h4 className="bt-text-xl bt-font-bold bt-text-gray-900 bt-mb-2">{task.title}</h4>
                <p className="bt-text-gray-700 bt-text-sm bt-mb-3">{task.description}</p>
                <div className="bt-grid bt-grid-cols-1 bt-sm-grid-cols-2 bt-gap-2 bt-text-sm bt-text-gray-600">
                    <div className="bt-flex bt-items-center"><TagIcon className="bt-w-4 bt-h-4 bt-mr-2" /><span className={`bt-font-semibold ${getPriorityColorClass(task.priority)}`}>{task.priority} Priority</span></div>
                    <div className="bt-flex bt-items-center"><UserIcon className="bt-w-4 bt-h-4 bt-mr-2" />Assigned to: <span className="bt-font-semibold bt-ml-1">{task.assignee}</span></div>
                    <div className="bt-flex bt-items-center"><CalendarIcon className="bt-w-4 bt-h-4 bt-mr-2" />Due: <span className="bt-font-semibold bt-ml-1">{task.importantDates?.dueDate}</span></div>
                    <div className="bt-flex bt-items-center"><ClockIcon className="bt-w-4 bt-h-4 bt-mr-2" />Time Spent: <span className="bt-font-semibold bt-ml-1">{task.timeSpent.toFixed(2)} hrs</span></div>
                    <span className={`bt-inline-flex bt-items-center bt-px-3 bt-py-1 bt-rounded-full bt-text-xs bt-font-medium ${getStatusColorClass(task.status)}`}>
                        <ListIcon className="bt-w-3 bt-h-3 bt-mr-1" />{task.status}
                    </span>
                </div>
            </div>
            <div className="bt-flex bt-flex-wrap bt-gap-2 bt-justify-end">
                {!isManager && task.status !== 'Closed' && (
                    <>
                        <button
                            onClick={() => onEdit(task)}
                            className="bt-p-2 bt-bg-blue-500 bt-text-white bt-rounded-full bt-hover-bg-blue-600 bt-transition bt-duration-150 bt-ease-in-out bt-shadow-md"
                            title="Edit Task"
                        >
                            <EditIcon className="bt-w-5 bt-h-5" />
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="bt-p-2 bt-bg-red-500 bt-text-white bt-rounded-full bt-hover-bg-red-600 bt-transition bt-duration-150 bt-ease-in-out bt-shadow-md"
                            title="Delete Task"
                        >
                            <TrashIcon className="bt-w-5 bt-h-5" />
                        </button>
                        <button
                            onClick={() => onTimeTrack(task.id)}
                            className="bt-p-2 bt-bg-purple-500 bt-text-white bt-rounded-full bt-hover-bg-purple-600 bt-transition bt-duration-150 bt-ease-in-out bt-shadow-md"
                            title="Log Time"
                        >
                            <ClockIcon className="bt-w-5 bt-h-5" />
                        </button>
                        {task.status === 'Open' && (
                             <button
                                onClick={() => onToggleClose(task.id, 'Pending Approval')}
                                className="bt-p-2 bt-bg-yellow-500 bt-text-white bt-rounded-full bt-hover-bg-yellow-600 bt-transition bt-duration-150 bt-ease-in-out bt-shadow-md"
                                title="Close Task (Pending Approval)"
                            >
                                <CheckCircleIcon className="bt-w-5 bt-h-5" />
                            </button>
                        )}
                    </>
                )}
                {isManager && task.status === 'Pending Approval' && (
                    <>
                        <button
                            onClick={() => onApprove(task.id)}
                            className="bt-p-2 bt-bg-green-500 bt-text-white bt-rounded-full bt-hover-bg-green-600 bt-transition bt-duration-150 bt-ease-in-out bt-shadow-md"
                            title="Approve Closure"
                        >
                            <CheckCircleIcon className="bt-w-5 bt-h-5" />
                        </button>
                        <button
                            onClick={() => onReopen(task.id)}
                            className="bt-p-2 bt-bg-red-500 bt-text-white bt-rounded-full bt-hover-bg-red-600 bt-transition bt-duration-150 bt-ease-in-out bt-shadow-md"
                            title="Re-open Task"
                        >
                            <XCircleIcon className="bt-w-5 bt-h-5" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// Trend Line Chart (Placeholder for now)
const TrendLineChart = ({ data }) => {
    // This is a simplified placeholder. In a real app, you'd use a charting library like Recharts.
    // Data would be in a format like [{ date: 'YYYY-MM-DD', activeTasks: N }]
    return (
        <div className="bt-bg-white bt-rounded-xl bt-shadow-md bt-p-6 bt-border bt-border-gray-200 bt-h-64 bt-flex bt-items-center bt-justify-center bt-text-gray-500">
            <TrendingUpIcon className="bt-w-8 bt-h-8 bt-mr-2" />
            <p className="bt-text-lg">Trend Line Chart of Concurrent Tasks (Placeholder)</p>
        </div>
    );
};


// Developer Dashboard
const DeveloperDashboard = ({ tasks, updateTask, deleteTask }) => {
    const { user } = useContext(AuthContext);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isTimeTrackModalOpen, setIsTimeTrackModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskToDeleteId, setTaskToDeleteId] = useState(null);
    const [taskToTimeTrackId, setTaskToTimeTrackId] = useState(null);
    const [timeToLog, setTimeToLog] = useState('');

    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate', 'priority', 'status'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

    const handleCreateTask = (newTask) => {
        updateTask(newTask); // Add new task
        setIsFormModalOpen(false);
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setIsFormModalOpen(true);
    };

    const handleUpdateTask = (updatedTask) => {
        updateTask(updatedTask);
        setIsFormModalOpen(false);
        setSelectedTask(null);
    };

    const handleDeleteConfirmation = (id) => {
        setTaskToDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        deleteTask(taskToDeleteId);
        setIsDeleteModalOpen(false);
        setTaskToDeleteId(null);
    };

    const handleTimeTrack = (id) => {
        setTaskToTimeTrackId(id);
        setIsTimeTrackModalOpen(true);
    };

    const handleLogTime = () => {
        if (!timeToLog || isNaN(parseFloat(timeToLog))) {
            // In a real app, show a proper validation message
            console.error('Invalid time input');
            return;
        }
        const timeValue = parseFloat(timeToLog);
        const task = tasks.find(t => t.id === taskToTimeTrackId);
        if (task) {
            updateTask({ ...task, timeSpent: (task.timeSpent || 0) + timeValue });
        }
        setIsTimeTrackModalOpen(false);
        setTaskToTimeTrackId(null);
        setTimeToLog('');
    };

    const handleToggleClose = (id, newStatus) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            updateTask({ ...task, status: newStatus });
        }
    };

    const filteredAndSortedTasks = useCallback(() => {
        let filtered = tasks.filter(task => task.assignee === user.username);

        if (filterStatus !== 'All') {
            filtered = filtered.filter(task => task.status === filterStatus);
        }
        if (filterPriority !== 'All') {
            filtered = filtered.filter(task => task.priority === filterPriority);
        }

        return filtered.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'dueDate') {
                const dateA = new Date(a.importantDates?.dueDate || '9999-12-31');
                const dateB = new Date(b.importantDates?.dueDate || '9999-12-31');
                comparison = dateA - dateB;
            } else if (sortBy === 'priority') {
                const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                comparison = priorityOrder[b.priority] - priorityOrder[a.priority]; // High comes first
            } else if (sortBy === 'status') {
                const statusOrder = { 'Open': 3, 'Pending Approval': 2, 'Closed': 1 };
                comparison = statusOrder[b.status] - statusOrder[a.status];
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [tasks, user.username, filterStatus, filterPriority, sortBy, sortOrder]);


    return (
        <div className="bt-p-6 bt-bg-gray-50 bt-min-h-screen">
            <h3 className="bt-text-3xl bt-font-bold bt-text-gray-900 bt-mb-8">My Tasks ({user.username})</h3>

            <div className="bt-bg-white bt-p-6 bt-rounded-xl bt-shadow-md bt-border bt-border-gray-200 bt-mb-6 bt-flex bt-flex-col bt-sm-flex-row bt-justify-between bt-items-center bt-space-y-4 bt-sm-space-y-0">
                <button
                    onClick={() => { setSelectedTask(null); setIsFormModalOpen(true); }}
                    className="bt-flex bt-items-center bt-px-6 bt-py-3 bt-bg-blue-600 bt-text-white bt-rounded-lg bt-hover-bg-blue-700 bt-transition bt-duration-150 bt-ease-in-out bt-shadow-lg bt-text-lg bt-font-semibold"
                >
                    <PlusIcon className="bt-w-5 bt-h-5 bt-mr-2" />
                    Create New Task
                </button>
                <div className="bt-flex bt-flex-wrap bt-gap-4 bt-items-center">
                    <div className="bt-flex bt-items-center bt-space-x-2">
                        <FilterIcon className="bt-w-5 bt-h-5 bt-text-gray-600" />
                        <label htmlFor="filterStatus" className="bt-text-sm bt-font-medium bt-text-gray-700 bt-sr-only">Filter by Status</label>
                        <select
                            id="filterStatus"
                            className="bt-px-4 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-text-sm bt-focus-input"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="Pending Approval">Pending Approval</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div className="bt-flex bt-items-center bt-space-x-2">
                        <FilterIcon className="bt-w-5 bt-h-5 bt-text-gray-600" />
                        <label htmlFor="filterPriority" className="bt-text-sm bt-font-medium bt-text-gray-700 bt-sr-only">Filter by Priority</label>
                        <select
                            id="filterPriority"
                            className="bt-px-4 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-text-sm bt-focus-input"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                        >
                            <option value="All">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="bt-flex bt-items-center bt-space-x-2">
                        {sortOrder === 'asc' ? <SortAscIcon className="bt-w-5 bt-h-5 bt-text-gray-600" /> : <SortDescIcon className="bt-w-5 bt-h-5 bt-text-gray-600" />}
                        <label htmlFor="sortBy" className="bt-text-sm bt-font-medium bt-text-gray-700 bt-sr-only">Sort By</label>
                        <select
                            id="sortBy"
                            className="bt-px-4 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-text-sm bt-focus-input"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="bt-p-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-hover-bg-gray-100 bt-transition bt-duration-150 bt-ease-in-out"
                        >
                            {sortOrder === 'asc' ? <SortAscIcon className="bt-w-5 bt-h-5" /> : <SortDescIcon className="bt-w-5 bt-h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bt-space-y-4">
                {filteredAndSortedTasks().length === 0 ? (
                    <p className="bt-text-center bt-text-gray-500 bt-text-lg bt-py-10">No tasks found for your filters.</p>
                ) : (
                    filteredAndSortedTasks().map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteConfirmation}
                            onTimeTrack={handleTimeTrack}
                            onToggleClose={handleToggleClose}
                            isManager={false} // Developer role
                        />
                    ))
                )}
            </div>

            <Modal
                isOpen={isFormModalOpen}
                onClose={() => { setIsFormModalOpen(false); setSelectedTask(null); }}
                title={selectedTask ? 'Edit Task' : 'Create New Task'}
            >
                <TaskForm
                    task={selectedTask}
                    onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
                    onClose={() => { setIsFormModalOpen(false); setSelectedTask(null); }}
                />
            </Modal>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => { setIsDeleteModalOpen(false); setTaskToDeleteId(null); }}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this task? This action cannot be undone."
            />

            <Modal
                isOpen={isTimeTrackModalOpen}
                onClose={() => { setIsTimeTrackModalOpen(false); setTaskToTimeTrackId(null); setTimeToLog(''); }}
                title="Log Time Spent"
            >
                <p className="bt-text-gray-700 bt-mb-4">Enter time in hours (e.g., 0.5 for 30 mins, 2 for 2 hours):</p>
                <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={timeToLog}
                    onChange={(e) => setTimeToLog(e.target.value)}
                    className="bt-mt-1 bt-block bt-w-full bt-px-3 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-focus-input"
                    placeholder="e.g., 2.5"
                />
                <div className="bt-flex bt-justify-end bt-space-x-3 bt-mt-6">
                    <button
                        onClick={() => { setIsTimeTrackModalOpen(false); setTaskToTimeTrackId(null); setTimeToLog(''); }}
                        className="bt-px-5 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-text-gray-700 bt-hover-bg-gray-50 bt-transition bt-duration-150 bt-ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogTime}
                        className="bt-px-5 bt-py-2 bt-bg-purple-600 bt-text-white bt-rounded-lg bt-hover-bg-purple-700 bt-transition bt-duration-150 bt-ease-in-out"
                    >
                        Log Time
                    </button>
                </div>
            </Modal>
        </div>
    );
};

// Manager Dashboard
const ManagerDashboard = ({ tasks, updateTask }) => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterAssignee, setFilterAssignee] = useState('All');
    const [sortBy, setSortBy] = useState('dueDate');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleApproveClosure = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            updateTask({ ...task, status: 'Closed', importantDates: { ...task.importantDates, closedDate: new Date().toISOString().split('T')[0] } });
        }
    };

    const handleReopenTask = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
            updateTask({ ...task, status: 'Open', importantDates: { ...task.importantDates, closedDate: null } });
        }
    };

    const allAssignees = [...new Set(tasks.map(task => task.assignee))];

    const filteredAndSortedTasks = useCallback(() => {
        let filtered = tasks;

        if (filterStatus !== 'All') {
            filtered = filtered.filter(task => task.status === filterStatus);
        }
        if (filterAssignee !== 'All') {
            filtered = filtered.filter(task => task.assignee === filterAssignee);
        }

        return filtered.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'dueDate') {
                const dateA = new Date(a.importantDates?.dueDate || '9999-12-31');
                const dateB = new Date(b.importantDates?.dueDate || '9999-12-31');
                comparison = dateA - dateB;
            } else if (sortBy === 'priority') {
                const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
            } else if (sortBy === 'status') {
                const statusOrder = { 'Open': 3, 'Pending Approval': 2, 'Closed': 1 };
                comparison = statusOrder[b.status] - statusOrder[a.status];
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [tasks, filterStatus, filterAssignee, sortBy, sortOrder]);


    // Simplified trend line data (static for demonstration)
    const trendData = [
        { date: '2023-01-01', activeTasks: 10 },
        { date: '2023-01-02', activeTasks: 12 },
        { date: '2023-01-03', activeTasks: 9 },
        { date: '2023-01-04', activeTasks: 15 },
        { date: '2023-01-05', activeTasks: 11 },
    ];

    return (
        <div className="bt-p-6 bt-bg-gray-50 bt-min-h-screen">
            <h3 className="bt-text-3xl bt-font-bold bt-text-gray-900 bt-mb-8">Manager Dashboard - All Tasks</h3>

            <div className="bt-grid bt-grid-cols-1 bt-md-grid-cols-2 bt-gap-6 bt-mb-8">
                <div className="bt-bg-white bt-rounded-xl bt-shadow-md bt-p-6 bt-border bt-border-gray-200">
                    <h4 className="bt-text-xl bt-font-bold bt-text-gray-900 bt-mb-4">Task Summary</h4>
                    <div className="bt-grid bt-grid-cols-2 bt-gap-4 bt-text-center">
                        <div className="bt-p-4 bt-bg-blue-50 bt-rounded-lg">
                            <p className="bt-text-3xl bt-font-bold bt-text-blue-700">{tasks.filter(t => t.status === 'Open').length}</p>
                            <p className="bt-text-sm bt-text-gray-600">Open Tasks</p>
                        </div>
                        <div className="bt-p-4 bt-bg-yellow-50 bt-rounded-lg">
                            <p className="bt-3xl bt-font-bold bt-text-yellow-700">{tasks.filter(t => t.status === 'Pending Approval').length}</p>
                            <p className="bt-text-sm bt-text-gray-600">Pending Approval</p>
                        </div>
                        <div className="bt-p-4 bt-bg-green-50 bt-rounded-lg">
                            <p className="bt-3xl bt-font-bold bt-text-green-700">{tasks.filter(t => t.status === 'Closed').length}</p>
                            <p className="bt-text-sm bt-text-gray-600">Closed Tasks</p>
                        </div>
                        <div className="bt-p-4 bt-bg-gray-50 bt-rounded-lg">
                            <p className="bt-3xl bt-font-bold bt-text-gray-700">{tasks.length}</p>
                            <p className="bt-text-sm bt-text-gray-600">Total Tasks</p>
                        </div>
                    </div>
                </div>
                <TrendLineChart data={trendData} />
            </div>

            <div className="bt-bg-white bt-p-6 bt-rounded-xl bt-shadow-md bt-border bt-border-gray-200 bt-mb-6 bt-flex bt-flex-col bt-sm-flex-row bt-justify-between bt-items-center bt-space-y-4 bt-sm-space-y-0">
                <div className="bt-flex bt-flex-wrap bt-gap-4 bt-items-center">
                    <div className="bt-flex bt-items-center bt-space-x-2">
                        <FilterIcon className="bt-w-5 bt-h-5 bt-text-gray-600" />
                        <label htmlFor="filterStatus" className="bt-text-sm bt-font-medium bt-text-gray-700 bt-sr-only">Filter by Status</label>
                        <select
                            id="filterStatus"
                            className="bt-px-4 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-text-sm bt-focus-input"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="Pending Approval">Pending Approval</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div className="bt-flex bt-items-center bt-space-x-2">
                        <FilterIcon className="bt-w-5 bt-h-5 bt-text-gray-600" />
                        <label htmlFor="filterAssignee" className="bt-text-sm bt-font-medium bt-text-gray-700 bt-sr-only">Filter by Assignee</label>
                        <select
                            id="filterAssignee"
                            className="bt-px-4 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-text-sm bt-focus-input"
                            value={filterAssignee}
                            onChange={(e) => setFilterAssignee(e.target.value)}
                        >
                            <option value="All">All Assignees</option>
                            {allAssignees.map(assignee => (
                                <option key={assignee} value={assignee}>{assignee}</option>
                            ))}
                        </select>
                    </div>
                    <div className="bt-flex bt-items-center bt-space-x-2">
                        {sortOrder === 'asc' ? <SortAscIcon className="bt-w-5 bt-h-5 bt-text-gray-600" /> : <SortDescIcon className="bt-w-5 bt-h-5 bt-text-gray-600" />}
                        <label htmlFor="sortBy" className="bt-text-sm bt-font-medium bt-text-gray-700 bt-sr-only">Sort By</label>
                        <select
                            id="sortBy"
                            className="bt-px-4 bt-py-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-text-sm bt-focus-input"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="bt-p-2 bt-border bt-border-gray-300 bt-rounded-lg bt-shadow-sm bt-hover-bg-gray-100 bt-transition bt-duration-150 bt-ease-in-out"
                        >
                            {sortOrder === 'asc' ? <SortAscIcon className="bt-w-5 bt-h-5" /> : <SortDescIcon className="bt-w-5 bt-h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bt-space-y-4">
                {filteredAndSortedTasks().length === 0 ? (
                    <p className="bt-text-center bt-text-gray-500 bt-text-lg bt-py-10">No tasks found for your filters.</p>
                ) : (
                    filteredAndSortedTasks().map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onApprove={handleApproveClosure}
                            onReopen={handleReopenTask}
                            isManager={true} // Manager role
                        />
                    ))
                )}
            </div>
        </div>
    );
};

// Main Dashboard Container
const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState(() => {
        // Initialize with some mock data
        const initialTasks = [
            {
                id: 'task-001',
                title: 'Implement User Authentication',
                description: 'Set up mock authentication for developer and manager roles.',
                priority: 'High',
                status: 'Open',
                assignee: 'dev',
                importantDates: {
                    createdDate: '2024-05-01',
                    dueDate: '2024-05-15',
                    closedDate: null,
                },
                timeSpent: 12.5,
            },
            {
                id: 'task-002',
                title: 'Design Dashboard UI',
                description: 'Create a responsive layout for the dashboard using Tailwind CSS.',
                priority: 'Medium',
                status: 'Open',
                assignee: 'dev',
                importantDates: {
                    createdDate: '2024-05-05',
                    dueDate: '2024-05-20',
                    closedDate: null,
                },
                timeSpent: 8.0,
            },
            {
                id: 'task-003',
                title: 'Refactor Task Management Logic',
                description: 'Improve the state management for creating, editing, and deleting tasks.',
                priority: 'High',
                status: 'Pending Approval',
                assignee: 'dev',
                importantDates: {
                    createdDate: '2024-05-10',
                    dueDate: '2024-05-25',
                    closedDate: null,
                },
                timeSpent: 5.0,
            },
            {
                id: 'task-004',
                title: 'Review Frontend Codebase',
                description: 'Conduct a code review of the entire frontend application.',
                priority: 'Low',
                status: 'Closed',
                assignee: 'manager', // Manager task for demonstration purposes
                importantDates: {
                    createdDate: '2024-04-20',
                    dueDate: '2024-05-01',
                    closedDate: '2024-05-01',
                },
                timeSpent: 10.0,
            },
            {
                id: 'task-005',
                title: 'Optimize Image Assets',
                description: 'Reduce file sizes of images for faster loading times.',
                priority: 'Medium',
                status: 'Open',
                assignee: 'dev',
                importantDates: {
                    createdDate: '2024-06-01',
                    dueDate: '2024-06-15',
                    closedDate: null,
                },
                timeSpent: 3.0,
            },
            {
                id: 'task-006',
                title: 'Setup CI/CD Pipeline',
                description: 'Configure automated deployment for the application.',
                priority: 'High',
                status: 'Open',
                assignee: 'dev',
                importantDates: {
                    createdDate: '2024-06-05',
                    dueDate: '2024-06-25',
                    closedDate: null,
                },
                timeSpent: 6.0,
            },
            {
                id: 'task-007',
                title: 'Write API Documentation',
                description: 'Document all REST endpoints for the backend services.',
                priority: 'Low',
                status: 'Closed',
                assignee: 'dev',
                importantDates: {
                    createdDate: '2024-05-20',
                    dueDate: '2024-05-30',
                    closedDate: '2024-05-30',
                },
                timeSpent: 7.5,
            },
        ];
        return initialTasks;
    });

    const updateTask = (updatedTask) => {
        setTasks((prevTasks) => {
            const existingIndex = prevTasks.findIndex((t) => t.id === updatedTask.id);
            if (existingIndex > -1) {
                // Update existing task
                return prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
            } else {
                // Add new task
                return [...prevTasks, updatedTask];
            }
        });
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    };

    return (
        <div className="bt-flex bt-flex-col bt-min-h-screen bt-bg-gray-100">
            {/* Navbar */}
            <nav className="bt-bg-white bt-shadow-sm bt-p-4 bt-flex bt-justify-between bt-items-center bt-border-b bt-border-gray-200">
                <h1 className="bt-text-2xl bt-font-bold bt-text-gray-800">TaskFlow</h1>
                <div className="bt-flex bt-items-center bt-space-x-4">
                    <span className="bt-text-gray-700 bt-font-medium">
                        Welcome, {user?.username} ({user?.role})
                    </span>
                    <button
                        onClick={logout}
                        className="bt-px-4 bt-py-2 bt-bg-red-500 bt-text-white bt-rounded-lg bt-hover-bg-red-600 bt-transition bt-duration-150 bt-ease-in-out bt-shadow-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="bt-flex-grow">
                {user?.role === 'developer' && (
                    <DeveloperDashboard tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                )}
                {user?.role === 'manager' && (
                    <ManagerDashboard tasks={tasks} updateTask={updateTask} />
                )}
            </main>
        </div>
    );
};


// App Component
const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

const AppContent = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="font-sans antialiased bt-min-h-screen bt-flex bt-flex-col bt-w-full">
            {/* Inter font from Google Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    background-color: #f3f4f6; /* Light gray background */
                }

                /* General Layout */
                .bt-min-h-screen { min-height: 100vh; }
                .bt-flex { display: flex; }
                .bt-flex-col { flex-direction: column; }
                .bt-flex-grow { flex-grow: 1; }
                .bt-items-center { align-items: center; }
                .bt-justify-center { justify-content: center; }
                .bt-justify-between { justify-content: right; }
                .bt-justify-end { justify-content: flex-end; }
                .bt-flex-wrap { flex-wrap: wrap; }
                .bt-grid { display: grid; }
                .bt-grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
                .bt-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                .bt-w-full { width: 100%; }
                .bt-max-w-md { max-width: 28rem; } /* 448px */
                .bt-max-w-lg { max-width: 32rem; } /* 512px */
                .bt-h-64 { height: 16rem; } /* 256px */
                .bt-relative { position: relative; }
                .bt-absolute { position: absolute; }
                .bt-top-4 { top: 1rem; }
                .bt-right-4 { right: 1rem; }
                .bt-z-50 { z-index: 50; }

                /* Spacing */
                .bt-p-4 { padding: 1rem; }
                .bt-p-6 { padding: 1.5rem; }
                .bt-p-8 { padding: 4rem; margin-left: 30rem;}
                .bt-px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
                .bt-px-4 { padding-left: 1rem; padding-right: 1rem; }
                .bt-px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
                .bt-px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
                .bt-py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
                .bt-py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
                .bt-py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
                .bt-py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }

                .bt-mt-1 { margin-top: 0.25rem; }
                .bt-mt-6 { margin-top: 1.5rem; }
                .bt-mb-2 { margin-bottom: 0.5rem; }
                .bt-mb-3 { margin-bottom: 0.75rem; }
                .bt-mb-4 { margin-bottom: 1rem; }
                .bt-mb-6 { margin-bottom: 1.5rem; }
                .bt-mb-8 { margin-bottom: 2rem; }

                .bt-space-x-2 > *:not([hidden]) ~ *:not([hidden]) { margin-left: 0.5rem; }
                .bt-space-x-3 > *:not([hidden]) ~ *:not([hidden]) { margin-left: 0.75rem; }
                .bt-space-x-4 > *:not([hidden]) ~ *:not([hidden]) { margin-left: 1rem; }
                .bt-space-y-4 > *:not([hidden]) ~ *:not([hidden]) { margin-top: 1rem; }
                .bt-space-y-6 > *:not([hidden]) ~ *:not([hidden]) { margin-top: 1.5rem; }
                .bt-gap-2 { gap: 0.5rem; }
                .bt-gap-4 { gap: 1rem; }
                .bt-gap-6 { gap: 1.5rem; }

                /* Backgrounds */
                .bt-bg-gray-100 { background-color: #f3f4f6; }
                .bt-bg-gray-50 { background-color: #f9fafb; }
                .bt-bg-gray-600 { background-color: #4b5563; }
                .bt-bg-opacity-50 { background-color: rgba(75, 85, 99, 0.5); }
                .bt-bg-white { background-color: #fff; }
                .bt-bg-blue-600 { background-color: #2563eb; }
                .bt-hover-bg-blue-700:hover { background-color: #1d4ed8; }
                .bt-bg-blue-500 { background-color: #3b82f6; }
                .bt-hover-bg-blue-600:hover { background-color: #2563eb; }
                .bt-bg-red-500 { background-color: #ef4444; }
                .bt-bg-red-600 { background-color: #dc2626; }
                .bt-hover-bg-red-600:hover { background-color: #dc2626; }
                .bt-hover-bg-red-700:hover { background-color: #b91c1c; }
                .bt-bg-purple-500 { background-color: #a855f7; }
                .bt-hover-bg-purple-600:hover { background-color: #9333ea; }
                .bt-hover-bg-purple-700:hover { background-color: #7e22ce; }
                .bt-bg-yellow-500 { background-color: #eab308; }
                .bt-hover-bg-yellow-600:hover { background-color: #ca8a04; }
                .bt-bg-green-500 { background-color: #22c55e; }
                .bt-hover-bg-green-600:hover { background-color: #16a34a; }
                .bt-bg-blue-100 { background-color: #dbeafe; }
                .bt-bg-yellow-100 { background-color: #fef9c3; }
                .bt-bg-green-100 { background-color: #dcfce7; }
                .bt-bg-blue-50 { background-color: #eff6ff; }
                .bt-bg-yellow-50 { background-color: #fffbeb; }
                .bt-bg-green-50 { background-color: #f0fdf4; }

                /* Text colors */
                .bt-text-gray-900 { color: #111827; }
                .bt-text-gray-700 { color: #374151; }
                .bt-text-gray-600 { color: #4b5563; }
                .bt-text-gray-500 { color: #6b7280; }
                .bt-text-gray-400 { color: #9ca3af; }
                .bt-text-white { color: #fff; }
                .bt-text-blue-800 { color: #1e40af; }
                .bt-text-yellow-800 { color: #92400e; }
                .bt-text-green-800 { color: #166534; }
                .bt-text-red-600 { color: #dc2626; }
                .bt-text-yellow-600 { color: #ca8a04; }
                .bt-text-green-600 { color: #22c55e; }
                .bt-text-blue-700 { color: #1d4ed8; }
                .bt-hover-text-gray-600:hover { color: #4b5563; }
                .bt-hover-bg-gray-50:hover { background-color: #f9fafb; }

                /* Font Sizes */
                .bt-text-xs { font-size: 0.75rem; line-height: 1rem; }
                .bt-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
                .bt-text-lg { font-size: 1.125rem; line-height: 1.75rem; }
                .bt-text-xl { font-size: 1.25rem; line-height: 1.75rem; }
                .bt-text-2xl { font-size: 1.5rem; line-height: 2rem; }
                .bt-text-3xl { font-size: 1.875rem; line-height: 2.25rem; }

                /* Font Weights */
                .bt-font-medium { font-weight: 500; }
                .bt-font-semibold { font-weight: 600; }
                .bt-font-bold { font-weight: 700; }
                .bt-font-extrabold { font-weight: 800; }

                /* Text Alignment */
                .bt-text-center { text-align: center; }

                /* Borders and Radii */
                .bt-border { border-width: 1px; border-style: solid; }
                .bt-border-gray-200 { border-color: #e5e7eb; }
                .bt-border-gray-300 { border-color: #d1d5db; }
                .bt-border-b { border-bottom-width: 1px; }
                .bt-border-transparent { border-color: transparent; }
                .bt-rounded-lg { border-radius: 0.5rem; }
                .bt-rounded-xl { border-radius: 0.75rem; }
                .bt-rounded-full { border-radius: 9999px; }

                /* Shadows */
                .bt-shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
                .bt-shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
                .bt-shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
                .bt-shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }

                /* Other */
                .bt-block { display: block; }
                .bt-inline-flex { display: inline-flex; }
                .bt-transition { transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
                .bt-duration-150 { transition-duration: 150ms; }
                .bt-ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
                .bt-sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border-width: 0;
                }
                .bt-focus-input:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* ring-blue-500 */
                    border-color: #3b82f6; /* border-blue-500 */
                }
                .bt-focus-button:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 0 4px rgba(59, 130, 246, 0.25); /* ring-blue-500, ring-offset-2 */
                }
                .bt-scale-100 { transform: scale(1); }
                .bt-opacity-100 { opacity: 1; }
                .bt-transform { transform: var(--tw-transform); }
                .bt-transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
                .bt-last-mb-0:last-child { margin-bottom: 0; }

                /* Icon sizing */
                .bt-w-3 { width: 0.75rem; } .bt-h-3 { height: 0.75rem; }
                .bt-w-4 { width: 1rem; } .bt-h-4 { height: 1rem; }
                .bt-w-5 { width: 1.25rem; } .bt-h-5 { height: 1.25rem; }
                .bt-w-6 { width: 1.5rem; } .bt-h-6 { height: 1.5rem; }
                .bt-w-8 { width: 2rem; } .bt-h-8 { height: 2rem; }
                .bt-mr-1 { margin-right: 0.25rem; }
                .bt-mr-2 { margin-right: 0.5rem; }
                .bt-ml-1 { margin-left: 0.25rem; }

                /* Media Queries (mimicking Tailwind breakpoints) */
                @media (min-width: 640px) { /* sm breakpoint */
                    .bt-sm-flex-row { flex-direction: row; }
                    .bt-sm-space-y-0 > *:not([hidden]) ~ *:not([hidden]) { margin-top: 0; }
                    .bt-sm-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                    .bt-sm-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
                }

                @media (min-width: 768px) { /* md breakpoint */
                    .bt-md-flex-row { flex-direction: row; }
                    .bt-md-items-center { align-items: center; }
                    .bt-md-mb-0 { margin-bottom: 0; }
                    .bt-md-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                `}
            </style>
            {isAuthenticated ? <Dashboard /> : <LoginPage />}
        </div>
    );
};

export default App;
