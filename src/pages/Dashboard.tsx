import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList,
} from 'recharts';
import { DeveloperDev, TaskDev } from '../interfaces/types';

const mockDevelopers: DeveloperDev[] = [
    {
        id: 1,
        name: 'Dev A',
        email: 'a@example.com',
        skills: ['React', 'Node'],
        performance: 70,
        tasks: [
            {
                id: 1,
                title: 'Fix bug login',
                description: 'Resolve login issue in mobile view',
                assignedTo: 'Dev A',
                assigner: 'PM1',
                projects: ['Project Alpha'],
                kind: 'Bug',
                startDate: '2025-08-01',
                dueDate: '2025-08-10',
                status: 'In Progress',
                progress: 60,
                skills: ['React'],
                deadline: '2025-08-10',
            },
            {
                id: 2,
                title: 'Implement dashboard',
                description: 'Create UI dashboard component',
                assignedTo: 'Dev A',
                assigner: 'PM1',
                projects: ['Project Alpha'],
                kind: 'Feature',
                startDate: '2025-08-11',
                dueDate: '2025-08-20',
                status: 'Pending',
                progress: 50,
                skills: ['React'],
                deadline: '2025-08-20',
            },
        ],
    },
    {
        id: 2,
        name: 'Dev B',
        email: 'b@example.com',
        skills: ['Java', 'Spring'],
        performance: 65,
        tasks: [
            {
                id: 3,
                title: 'Build API',
                description: 'Create RESTful APIs for tasks',
                assignedTo: 'Dev B',
                assigner: 'PM1',
                projects: ['Project Beta'],
                kind: 'Feature',
                startDate: '2025-08-01',
                dueDate: '2025-08-15',
                status: 'In Progress',
                progress: 50,
                skills: ['Java'],
                deadline: '2025-08-15',
            },
        ],
    },
    {
        id: 3,
        name: 'Dev C',
        email: 'c@example.com',
        skills: ['Python', 'AI'],
        performance: 95,
        tasks: [
            {
                id: 4,
                title: 'ML model',
                description: 'Train sentiment analysis model',
                assignedTo: 'Dev C',
                assigner: 'PM2',
                projects: ['Project AI'],
                kind: 'Research',
                startDate: '2025-08-03',
                dueDate: '2025-08-20',
                status: 'Completed',
                progress: 80,
                skills: ['Python', 'AI'],
                deadline: '2025-08-20',
            },
        ],
    },
];

export default function DevTaskDashboard() {
    const [developers, setDevelopers] = useState<DeveloperDev[]>([]);
    const [selectedDev, setSelectedDev] = useState<string | null>(null);

    useEffect(() => {
        setDevelopers(mockDevelopers);
    }, []);

    const selectedDeveloper = developers.find((d) => d.name === selectedDev);
    const selectedDevData = selectedDeveloper ? [selectedDeveloper] : developers;

    // Tiến độ theo task hoặc trung bình của từng dev
    const performanceChartData = selectedDeveloper
        ? selectedDeveloper.tasks.map((task) => ({
            name: task.title,
            progress: task.progress
        }))
        : developers.map((dev) => {
            const avgProgress =
                dev.tasks.reduce((sum, t) => sum + t.progress, 0) / (dev.tasks.length || 1);
            return {
                name: dev.name,
                progress: Math.round(avgProgress),
            };
        });

    return (
        <div className="flex flex-col gap-10 p-10 bg-gradient-to-br from-blue-100 via-indigo-100 to-white min-h-screen">
            {/* Drop list chọn Dev */}
            <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-xl shadow-sm w-fit">
                <label className="text-lg font-semibold text-gray-800">Thông tin nhân viên:</label>
                <select
                    className="ml-3 border border-gray-300 rounded-xl px-4 py-2 text-gray-800 bg-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                    value={selectedDev || ''}
                    onChange={(e) => setSelectedDev(e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {developers.map((dev) => (
                        <option key={dev.id} value={dev.name}>
                            {dev.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Biểu đồ số task theo Dev */}
            <div className="border rounded-2xl p-8 shadow-2xl bg-white/80 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-emerald-700 mb-6">📦 Số lượng task theo Dev</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={selectedDevData.map(dev => ({
                        name: dev.name,
                        tasks: dev.tasks.length
                    }))}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tasks" fill="#10B981" name="Số task" radius={[8, 8, 0, 0]}>
                            <LabelList dataKey="tasks" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Biểu đồ tiến độ */}
            <div className="border rounded-2xl p-8 shadow-2xl bg-white/80 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-indigo-700 mb-6">📊 Tiến độ hoàn thành công việc</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceChartData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="progress" fill="#6366F1" name="% Hoàn thành" radius={[8, 8, 0, 0]}>
                            <LabelList dataKey="progress" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Chi tiết Dev đã chọn */}
            {selectedDeveloper && (
                <div className="border border-gray-200 rounded-3xl p-10 shadow-2xl bg-white/90 backdrop-blur-md max-w-5xl mx-auto mt-12">
                    <h2 className="text-4xl font-extrabold text-yellow-600 mb-10 flex items-center gap-3">
                        📌 Chi tiết Developer
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Thông tin cơ bản */}
                        <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300">
                            <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                                🧾 Thông tin cơ bản
                            </h3>
                            <div className="space-y-3 text-gray-800 text-lg leading-relaxed">
                                <p><span className="font-semibold">👤 Tên:</span> {selectedDeveloper.name}</p>
                                <p><span className="font-semibold">📧 Email:</span> {selectedDeveloper.email}</p>
                                <p><span className="font-semibold">📋 Số task:</span> {selectedDeveloper.tasks.length}</p>
                                <p><span className="font-semibold">🚀 Hiệu suất:</span> {selectedDeveloper.performance}%</p>
                            </div>
                        </div>

                        {/* Kỹ năng */}
                        <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300">
                            <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                                🛠️ Kỹ năng
                            </h3>
                            <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg leading-relaxed pl-2">
                                {selectedDeveloper.skills.map((skill, index) => (
                                    <li key={index} className="hover:text-green-600 transition">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}