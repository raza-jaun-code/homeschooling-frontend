import React, { useEffect, useState } from 'react';
import { TrendingUp, Send, BookOpen, Star } from 'lucide-react';
import StudentHeader from '../components/Header.jsx';

const StudentProgress = () => {
    const [stats, setStats] = useState({
        totalAssignmentsByParent: 0,
        uniqueAssignmentsSubmitted: 0,
        averageMarks: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('studentToken');
            if (!token) {
                setError('You must be logged in.');
                setLoading(false);
                return;
            }

            try {
                // Fetch submission stats
                const resStats = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/submission/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!resStats.ok) throw new Error('Failed to fetch submission stats');
                const statsData = await resStats.json();

                // Fetch average marks
                const resMarks = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/v1/marks/student/average-marks`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!resMarks.ok) throw new Error('Failed to fetch average marks');
                const marksData = await resMarks.json();

                setStats({
                    ...statsData,
                    averageMarks: marksData || 0
                });
            } catch (err) {
                console.error(err);
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="text-white text-center mt-10">Loading progress...</div>;
    if (error) return <div className="text-red-400 text-center mt-10">{error}</div>;

    const submissionPercentage = stats.totalAssignmentsByParent
        ? ((stats.uniqueAssignmentsSubmitted / stats.totalAssignmentsByParent) * 100).toFixed(1)
        : 0;

    const progressMetrics = [
        {
            label: 'Total Assignments',
            value: stats.totalAssignmentsByParent,
            target: stats.totalAssignmentsByParent,
            unit: 'Tasks',
            color: 'bg-indigo-500',
            icon: BookOpen
        },
        {
            label: 'Assignments Submitted',
            value: stats.uniqueAssignmentsSubmitted,
            target: stats.totalAssignmentsByParent,
            unit: 'Tasks',
            color: 'bg-green-500',
            icon: Send
        },
        {
            label: 'Submission Percentage',
            value: submissionPercentage,
            target: 100,
            unit: '%',
            color: 'bg-pink-500',
            icon: TrendingUp
        },
        {
            label: 'Average Marks',
            value: stats.averageMarks.toFixed(1),
            target: 10,
            unit: '/10',
            color: 'bg-yellow-500',
            icon: Star
        }
    ];

    return (
        <div className="space-y-8">
            <StudentHeader title="Assignment Progress" icon={TrendingUp} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {progressMetrics.map((metric, index) => (
                    <div key={index} className="bg-[#0f172a]/70 backdrop-blur-sm border border-gray-800 rounded-3xl p-5 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-400">{metric.label}</span>
                            <metric.icon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">
                            {metric.value}{metric.unit !== 'Tasks' ? metric.unit : ''}
                        </div>
                        {metric.unit === 'Tasks' && (
                            <div className="text-sm text-gray-400">({metric.value} / {metric.target} completed)</div>
                        )}
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
                            <div
                                className={`h-2.5 rounded-full transition-all duration-1000 ${metric.color}`}
                                style={{ width: `${(metric.value / metric.target) * 100}%` }}
                            ></div>
                        </div>
                        {metric.unit !== 'Tasks' && <div className="text-xs text-gray-500 mt-2">Target: {metric.target}{metric.unit}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentProgress;