
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    quote: "Working with my WealthConnect advisor has completely transformed our family's financial future. We finally have a clear roadmap to follow.",
    author: "Robert Thompson",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "I was overwhelmed with planning for retirement until I found my advisor through WealthConnect. The personalized approach made all the difference.",
    author: "Jennifer Miller",
    role: "Healthcare Professional",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "My advisor not only helped with our investments but educated us along the way. That kind of relationship is invaluable.",
    author: "David Chen",
    role: "Tech Executive",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
  },
  {
    id: 4,
    quote: "The matching process was seamless, and I couldn't be happier with the advisor WealthConnect connected me with.",
    author: "Michelle Rodriguez",
    role: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=100&h=100&auto=format&fit=crop",
  },
];

export function TestimonialSection() {
  return (
    <div className="py-24 bg-wealth-950 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-gold-400">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Hear from families who have found their perfect financial match through our platform.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-4">
                <Card className="bg-wealth-900 border-wealth-800">
                  <CardContent className="p-6">
                    <blockquote className="mb-4 text-gray-200">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-white">{testimonial.author}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="static transform-none bg-wealth-800 hover:bg-wealth-700 border-0" />
            <CarouselNext className="static transform-none bg-wealth-800 hover:bg-wealth-700 border-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
