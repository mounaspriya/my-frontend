const cards = [
  { title: 'Daily Income', amount: '$345' },
  { title: 'Daily Expense', amount: '$380' },
  { title: 'Weekly Income', amount: '$5380' },
  { title: 'Weekly Expense', amount: '$4320' }
];

const DashboardCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {cards.map((card, idx) => (
      <div key={idx} className="bg-white p-4 rounded shadow">
        <h4 className="text-gray-500">{card.title}</h4>
        <p className="text-xl font-bold">{card.amount}</p>
      </div>
    ))}
  </div>
);

export default DashboardCards;
