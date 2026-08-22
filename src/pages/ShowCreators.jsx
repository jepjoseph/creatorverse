import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

import "../css/ShowCreators.css";

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching creators:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setCreators(data || []);
      setLoading(false);
    };

    fetchCreators();
  }, []);

  if (loading) {
    return (
      <main className="show-creators-page">
        <div className="page-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading creators...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="show-creators-page">
        <div className="page-container">
          <div className="error-state">
            <h1>Unable to load creators</h1>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="show-creators-page">
      <div className="page-container">
        <header className="creator-page-header">
          <div>
            <span className="page-eyebrow">CREATORVERSE</span>

            <h1>Discover Great Creators</h1>

            <p>
              Explore creators worth following and discover new voices, ideas,
              and inspiration.
            </p>
          </div>

          <Link to="/new" className="add-creator-button">
            + Add Creator
          </Link>
        </header>

        {creators.length === 0 ? (
          <div className="empty-state">
            <h2>No creators yet</h2>
            <p>
              Start building your Creatorverse by adding your first creator.
            </p>

            <Link to="/new" className="add-creator-button">
              Add Your First Creator
            </Link>
          </div>
        ) : (
          <>
            <div className="creator-count">
              {creators.length} {creators.length === 1 ? "creator" : "creators"}
            </div>

            <section className="creator-grid">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default ShowCreators;
