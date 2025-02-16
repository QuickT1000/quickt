import React, {useEffect, useMemo, useRef, useState} from 'react';
import './DashboardPage.scss';
import {
    Bar, BarChart, CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from "recharts";

import {readCharts} from "../../services/ChartsService";
import {QuicktHeader} from "../../base/header/QuicktHeader";
import {useGlobalStore} from "../../store/global";

export const DashboardPage = () => {
    const [data, setData] = useState([{country: '', total: 0}]);
    const lineData = useMemo(() => {
        return data;
    }, [data]);

    const {
        selectedProject,
        setSelectedProject,
    } = useGlobalStore();

    useEffect(() => {
        fetchCharts(selectedProject?.projectId, selectedProject?.locales)
    }, [selectedProject]);


    const fetchCharts = async (projectId, locales) => {
        if (projectId !== '') {
            try {
                const response = await readCharts(projectId, locales); // Wichtiger Fix: await hinzugefügt
                setData(response);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        }
    };

    return (
        <>
        <QuicktHeader />
        <div className='dashboard'>
            <h3 className='title'>{selectedProject?.projectName + ' Translations'}</h3>
            <div style={{paddingTop: 20, width: 600, height: 300}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lineData}> {/* oder data */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
        </>
    )
}