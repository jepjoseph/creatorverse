import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { supabase } from "../client";

import "../css//ViewCreator.css";

function ViewCreator() {
  const { id } = useParams();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);

        setError(error.message);
        setLoading(false);

        return;
      }

      setCreator(data);
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) {
    return (
      <main>
        <p>Loading creator...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Unable to load creator</h1>
        <p>{error}</p>

        <Link to="/">Back to Creatorverse</Link>
      </main>
    );
  }

  if (!creator) {
    return (
      <main>
        <h1>Creator not found</h1>

        <Link to="/">Back to Creatorverse</Link>
      </main>
    );
  }

  return (
    <main className="view-creator">
      <Link to="/" className="back-link">
        ← Back to Creatorverse
      </Link>

      <article className="creator-details">
        {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}

        <div className="creator-details-content">
          <h1>{creator.name}</h1>

          <p>{creator.description}</p>

          <a
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-button"
          >
            Visit Creator
          </a>

          <div className="creator-details-actions">
            <Link to={`/creator/${creator.id}/edit`}>Edit Creator</Link>

            <Link to="/">Back to Creatorverse</Link>
          </div>
        </div>
      </article>
    </main>
  );
}

export default ViewCreator;
