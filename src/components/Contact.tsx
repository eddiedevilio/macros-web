import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(`${apiUrl}/submit-contact-form`, formData);
      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold"></h3>
              <p className="text-gray-600">
                Have questions about our services? We're here to help! Reach out to us through any of these channels.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-ocean/10 p-3 rounded-2xl">
                  <Phone className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">+960 7753044</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-ocean/10 p-3 rounded-2xl">
                  <Mail className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">hello@macros.mv</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-ocean/10 p-3 rounded-2xl">
                  <MapPin className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600">Male' City, Maldives</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="rounded-xl"
                  required
                />
                <Input
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="rounded-xl"
                  required
                />
              </div>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl"
                required
              />
              <Input
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="rounded-xl"
                required
              />
              <Textarea
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="rounded-xl"
                rows={4}
                required
              />
              <Button
                type="submit"
                className="w-full bg-ocean hover:bg-ocean-dark transition-colors duration-300 rounded-xl"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
              {success && <p className="text-green-600 text-center">Message sent successfully!</p>}
              {error && <p className="text-red-600 text-center">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}