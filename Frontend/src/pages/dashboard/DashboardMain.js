import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState('');
    const [prix, setPrix] = useState('');
    const [nombrePlace, setNombrePlace] = useState(''); 
    const [numTel, setNumTel] = useState(''); 
    const [lien, setLien] = useState(''); 
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading to true

        if (!titre || !description || !date || !lieu || !prix || !nombrePlace  || !numTel) {
            alert('All fields are required');
            setLoading(false);  // Stop loading
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('lieu', lieu);
        formData.append('prix', prix);
        formData.append('nombrePlace', nombrePlace);
        formData.append('numTel', numTel);
        formData.append('lien', lien);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5000/ajoutevent', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="react-event-page pt---120 pb---120">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="container" style={{ maxWidth: "600px", margin: "auto", backgroundColor: "#fff", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                          <div className="event-right-form">
                              <form onSubmit={handleSubmit}>
                                  <div className="event-top" style={{ textAlign: "center", marginBottom: "30px" }}>
                                      <h3 style={{ fontSize: "28px", color: "#333", marginBottom: "10px" }}>Add Event</h3>
                                      <p style={{ fontSize: "16px", color: "#666" }}>
                                          Fill out the details to create a new event.
                                      </p>
                                  </div>

                                  <p>
                                      <label>Event Title</label>
                                      <input
                                          type="text"
                                          name="titre"
                                          value={titre}
                                          onChange={(e) => setTitre(e.target.value)}
                                          className="form-control"
                                          placeholder="Event Title"
                                      />
                                  </p>

                                  <p>
                                      <label>Description</label>
                                      <input
                                          type="text"
                                          name="description"
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                          className="form-control"
                                          placeholder="Description"
                                      />
                                  </p>

                                  <p>
                                      <label>Date</label>
                                      <input
                                          type="date"
                                          name="date"
                                          value={date}
                                          onChange={(e) => setDate(e.target.value)}
                                          className="form-control"
                                      />
                                  </p>

                                  <p>
                                      <label>Location (Lieu)</label>
                                      <input
                                          type="text"
                                          name="lieu"
                                          value={lieu}
                                          onChange={(e) => setLieu(e.target.value)}
                                          className="form-control"
                                          placeholder="Location"
                                      />
                                  </p>

                                  <p>
                                      <label>Price (Prix)</label>
                                      <input
                                          type="text"
                                          name="prix"
                                          value={prix}
                                          onChange={(e) => setPrix(e.target.value)}
                                          className="form-control"
                                          placeholder="Price"
                                      />
                                  </p>

                                  <p>
                                      <label>Number of Seats (Nombre de place)</label>
                                      <input
                                          type="text"
                                          name="nombrePlace"
                                          value={nombrePlace}
                                          onChange={(e) => setNombrePlace(e.target.value)}
                                          className="form-control"
                                          placeholder="Number of Seats"
                                      />
                                  </p>

                                  <p>
                                      <label>Contact Number (Num Tel)</label>
                                      <input
                                          type="text"
                                          name="numTel"
                                          value={numTel}
                                          onChange={(e) => setNumTel(e.target.value)}
                                          className="form-control"
                                          placeholder="Contact Number"
                                      />
                                  </p>

                                  <p>
                                      <label>Link (Lien)</label>
                                      <input
                                          type="text"
                                          name="lien"
                                          value={lien}
                                          onChange={(e) => setLien(e.target.value)}
                                          className="form-control"
                                          placeholder="Link"
                                      />
                                  </p>
                                  <p>
                                      <label>Image</label>
                                      <input
                                          type="file"
                                          name="image"
                                          onChange={(e) => setImage(e.target.files[0])}
                                          className="form-control"
                                      />
                                  </p>

                                  <button type="submit" id="button" name="submit" disabled={loading}>
                                      {loading ? 'Adding Event...' : 'Add Event'}
                                  </button>

                                  <ul className="social-links">
                                      <li><a href="#"><span aria-hidden="true" className="social_facebook"></span></a></li>
                                      <li><a href="#"><span aria-hidden="true" className="social_twitter"></span></a></li>
                                  </ul>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default Dashboard;
