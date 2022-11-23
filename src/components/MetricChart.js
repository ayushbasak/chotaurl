import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
const MetricChart = ({ data }) => {
    data = data.map((item) => {
        const date = new Date(item.date);
        return {
            timestamp: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
            clicks: item.count,
        };
    });
    console.log(data);
    return (
        <div className='flex flex-col w-full justify-center items-center p-10'>
            <LineChart
                width={800}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
}

export default MetricChart;