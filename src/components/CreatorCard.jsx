import { Link } from "react-router-dom";
import '../css/CreatorCard.css'

function CreatorCard({ creator }) {
  return (
    <article className="creator-card">
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}

      <div className="creator-card-content">
        <h2>{creator.name}</h2>

        <p>{creator.description}</p>

        <div className="creator-card-actions">
          <a href={creator.url} target="_blank" rel="noopener noreferrer">
            Visit Channel
          </a>

          <Link to={`/creator/${creator.id}`}>View Details</Link>

          <Link to={`/creator/${creator.id}/edit`}>Edit</Link>
        </div>
      </div>
    </article>
  );
}

export default CreatorCard;
