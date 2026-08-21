import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

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
      <main>
        <h1>Creatorverse</h1>
        <p>Loading creators...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Creatorverse</h1>
        <p>Unable to load creators.</p>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Creatorverse</h1>

      <p>Discover creators worth following.</p>

      <Link to="/new">Add Creator</Link>

      {creators.length === 0 ? (
        <p>No creators have been added yet.</p>
      ) : (
        <section className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </section>
      )}
    </main>
  );
}

export default ShowCreators;
