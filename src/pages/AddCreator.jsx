import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "../css/AddCreator.css";

const AddCreator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = await supabase.from("creators").insert([formData]);

    if (error) {
      console.error("Error adding creator:", error);
      alert("Failed to add creator.");
      return;
    }

    navigate("/");
  };

  return (
    <main className="add-creator-page">
      <section className="add-creator-container">
        <header className="add-creator-header">
          <h1>Add a Creator</h1>
          <p>
            Share a content creator you enjoy with the Creatorverse community.
          </p>
        </header>

        <form className="add-creator-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Creator Name</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter creator name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Creator URL</label>

            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://..."
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              placeholder="Tell us what this creator is known for..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageURL">
              Image URL
              <span> (Optional)</span>
            </label>

            <input
              id="imageURL"
              name="imageURL"
              type="url"
              placeholder="https://..."
              value={formData.imageURL}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="add-creator-button">
              Add Creator
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddCreator;
