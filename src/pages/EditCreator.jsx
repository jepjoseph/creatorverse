import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import "../css/EditCreator.css";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Load Creator
  // ==========================================

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading creator:", error);
        setError("Unable to load creator.");
        setLoading(false);
        return;
      }

      setFormData({
        name: data.name || "",
        url: data.url || "",
        description: data.description || "",
        imageURL: data.imageURL || "",
      });

      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  // ==========================================
  // Handle Form Changes
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // Update Creator
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSaving(true);

    const { error } = await supabase
      .from("creators")
      .update({
        name: formData.name,
        url: formData.url,
        description: formData.description,
        imageURL: formData.imageURL,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating creator:", error);
      setError("Failed to update creator. Please try again.");
      setSaving(false);
      return;
    }

    navigate(`/creator/${id}`);
  };

  // ==========================================
  // Delete Creator
  // ==========================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${formData.name}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setDeleting(true);

    const { error } = await supabase.from("creators").delete().eq("id", id);

    if (error) {
      console.error("Error deleting creator:", error);

      setError("Failed to delete creator. Please try again.");
      setDeleting(false);

      return;
    }

    navigate("/");
  };

  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
      <main className="edit-creator-page">
        <section className="edit-creator-container">
          <p className="edit-loading">Loading creator...</p>
        </section>
      </main>
    );
  }

  // ==========================================
  // Error State
  // ==========================================

  if (error && !formData.name) {
    return (
      <main className="edit-creator-page">
        <section className="edit-creator-container">
          <p className="edit-error">{error}</p>

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Back to Creators
          </button>
        </section>
      </main>
    );
  }

  // ==========================================
  // Edit Form
  // ==========================================

  return (
    <main className="edit-creator-page">
      <section className="edit-creator-container">
        <header className="edit-creator-header">
          <h1>Edit Creator</h1>

          <p>Update the information for this content creator.</p>
        </header>

        {error && <div className="edit-error-message">{error}</div>}

        <form className="edit-creator-form" onSubmit={handleSubmit}>
          {/* Name */}

          <div className="form-group">
            <label htmlFor="name">Creator Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* URL */}

          <div className="form-group">
            <label htmlFor="url">Creator URL</label>

            <input
              id="url"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}

          <div className="form-group">
            <label htmlFor="imageURL">
              Image URL
              <span> (Optional)</span>
            </label>

            <input
              id="imageURL"
              name="imageURL"
              type="url"
              value={formData.imageURL}
              onChange={handleChange}
            />
          </div>

          {/* Save / Cancel */}

          <div className="form-actions">
            <button
              type="submit"
              className="update-creator-button"
              disabled={saving || deleting}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="cancel-button"
              disabled={saving || deleting}
              onClick={() => navigate(`/creator/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Danger Zone */}

        <section className="delete-section">
          <div className="delete-section-content">
            <h2>Delete Creator</h2>

            <p>
              Permanently remove this creator from your Creatorverse. This
              action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            className="delete-creator-button"
            onClick={handleDelete}
            disabled={saving || deleting}
          >
            {deleting ? "Deleting..." : "Delete Creator"}
          </button>
        </section>
      </section>
    </main>
  );
};

export default EditCreator;
