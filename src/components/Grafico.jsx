import React from 'react'
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
const Grafico = ({leche=[]}) => {
    return (
                <ResponsiveContainer width={'99%'} height={300} className='animate__animated animate__backInLeft'>
                <AreaChart data={leche} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fecha" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="cantidad" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
            </ResponsiveContainer>
    )
}

export default Grafico
