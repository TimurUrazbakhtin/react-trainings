import { Bar, BarChart, Tooltip, XAxis, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  people: number;
}

const data: ChartData[] = [
  { name: '28 июл', people: 10 },
  { name: '29 июл', people: 15 },
  { name: '30 июл', people: 12 },
  { name: '31 июл', people: 8 },
  { name: '1 авг', people: 20 },
  { name: '2 авг', people: 5 },
  { name: '3 авг', people: 10 },
  { name: '4 авг', people: 7 },
  { name: '5 авг', people: 15 },
  { name: '6 авг', people: 18 },
];

export default function Chart() {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <Tooltip />
          <Bar dataKey="people" fill="#A3A3A3" barSize={70} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
