const TopBar = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <input type="text" placeholder="Search..." className="border px-3 py-2 rounded w-1/3" />
      <div className="flex items-center gap-2">
        <span>jamesbrown@example.com</span>
        <img src="https://via.placeholder.com/30" alt="Profile" className="rounded-full" />
      </div>
    </header>
  );
};

export default TopBar;
