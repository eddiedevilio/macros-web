import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface BookingFormProps {
  onClose?: () => void;
}

export default function BookingForm({ onClose }: BookingFormProps) {
  const [date, setDate] = useState<Date>();
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [numberOfPassengers, setNumberOfPassengers] = useState("");
  const [destinationFrom, setDestinationFrom] = useState("");
  const [destinationTo, setDestinationTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useIsMobile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(`${apiUrl}/submit-booking-form`, {
        fullName,
        contactInfo,
        date: date ? format(date, "PPP") : "",
        numberOfPassengers,
        destinationFrom,
        destinationTo,
      });

      if (response.status === 200) {
        setSuccess(true);
        setFullName("");
        setContactInfo("");
        setDate(undefined);
        setNumberOfPassengers("");
        setDestinationFrom("");
        setDestinationTo("");
      }
    } catch (err) {
      setError("Failed to send booking request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="h-full w-full max-w-6xl mx-auto">
      <form className="space-y-4 bg-white/50 backdrop-blur-md p-6 rounded-2xl h-full overflow-y-auto" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-ocean-dark">Plan Your Journey Today</h2>
            <p className="text-ocean-dark">Fill out the form to book your speedboat transfer.</p>
          </div>
          {isMobile && onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-xl"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
        
        <div className={cn(
          "grid gap-4",
          !isMobile && "grid-cols-2 md:grid-cols-3"
        )}>
          <Input 
            placeholder="Full Name" 
            className="bg-white/50 rounded-xl"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input 
            placeholder="Email or Mobile" 
            className="bg-white/50 rounded-xl"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/50 rounded-xl",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl bg-white/80">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            placeholder="Number of Passengers"
            type="number"
            min="1"
            max="36"
            className="bg-white/50 rounded-xl"
            value={numberOfPassengers}
            onChange={(e) => setNumberOfPassengers(e.target.value)}
            required
          />
          <Input 
            placeholder="From" 
            className="bg-white/50 rounded-xl"
            value={destinationFrom}
            onChange={(e) => setDestinationFrom(e.target.value)}
            required
          />
          <Input 
            placeholder="To" 
            className="bg-white/50 rounded-xl"
            value={destinationTo}
            onChange={(e) => setDestinationTo(e.target.value)}
            required
          />
        </div>
        
        <Button 
          type="submit"
          className="w-full bg-ocean hover:bg-ocean-dark transition-colors duration-300 rounded-xl"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Booking Request"}
        </Button>
        {success && <p className="text-green-600 text-center">Booking request sent successfully!</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </section>
  );
}