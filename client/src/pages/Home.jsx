import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="p-6 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Mechathon!</h1>
        <p className="text-lg text-gray-600">
          Explore the journey of mechanical innovations and hackathons.
        </p>
      </section>

      {/* Blogs Preview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest Blogs</h2>
        {/* Dummy Blog Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold">How We Built the AutoSort Bot</h3>
            <p className="text-sm text-gray-600">Aug 2025 • Team X</p>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold">3D Printing Gears for Drone Tech</h3>
            <p className="text-sm text-gray-600">July 2025 • Team Y</p>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold">CAD + AI: Future of Design</h3>
            <p className="text-sm text-gray-600">June 2025 • Team Z</p>
          </div>
        </div>
        <Link to="/blogs" className="text-blue-600 underline">
          View all blogs
        </Link>
      </section>

      {/* Hackathon History Preview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Hackathon History</h2>
        <ul className="space-y-2">
          <li>
            <strong>2025:</strong> AutoBot Sorter by Team MechNerds (1st Place)
          </li>
          <li>
            <strong>2024:</strong> Pneumatic Arm by Team Torque (2nd Place)
          </li>
          <li>
            <strong>2023:</strong> MechVision System by Team Visionary (1st Place)
          </li>
        </ul>
        <Link to="/history" className="text-blue-600 underline">
          View full history
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
