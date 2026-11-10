import React from 'react';
import { Box, Typography, Grid, Avatar, Card, CardContent, Container } from '@mui/material';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Full Stack Developer',
    avatar: '/path/to/john.jpg',
    quote: 'The next-saas-stripe-starter repo has truly revolutionized my development workflow. With its comprehensive features and seamless integration with Stripe, I\'ve been able to build and deploy projects faster than ever before. The documentation is clear and concise, making it easy to navigate through the setup process. I highly recommend next-saas-stripe-starter to any developer.',
    gridSize: { xs: 12, sm: 6, md: 4 }
  },
  {
    id: 2,
    name: 'David Johnson',
    position: 'DevOps Engineer',
    avatar: '/path/to/david.jpg',
    quote: 'Thanks to next-saas-stripe-starter, I was able to streamline the entire process and get payments up and running in no time.',
    gridSize: { xs: 12, sm: 6, md: 4 }
  },
  {
    id: 3,
    name: 'Emily Brown',
    position: 'Marketing Manager',
    avatar: '/path/to/emily.jpg',
    quote: 'next-saas-stripe-starter has been an invaluable asset in my role as a marketing manager. With its seamless integration with Stripe, I\'ve been able to launch targeted marketing campaigns with built-in payment functionality, allowing us to monetize our products and services more effectively.',
    gridSize: { xs: 12, sm: 6, md: 4 }
  },
  {
    id: 4,
    name: 'Michael Wilson',
    position: 'Project Manager',
    avatar: '/path/to/michael.jpg',
    quote: 'I\'m impressed by the quality of code and clear documentation of next-saas-stripe-starter. Kudos to the team!',
    gridSize: { xs: 12, sm: 6, md: 4 }
  },
  {
    id: 5,
    name: 'Alice Smith',
    position: 'UI/UX Designer',
    avatar: '/path/to/alice.jpg',
    quote: 'Thanks to next-saas-stripe-starter, I\'ve been able to create modern and attractive user interfaces in record time. The starter kit provides a solid foundation for building sleek and intuitive designs, allowing me to focus more on the creative aspects of my work.',
    gridSize: { xs: 12, sm: 6, md: 4 }
  },
  {
    id: 6,
    name: 'Sophia Garcia',
    position: 'Data Analyst',
    avatar: '/path/to/sophia.jpg',
    quote: 'next-saas-stripe-starter provided me with the tools I needed to efficiently manage user data. Thank you so much!',
    gridSize: { xs: 12, sm: 6, md: 4 }
  },
  {
    id: 7,
    name: 'Jason Stan',
    position: 'Web Designer',
    avatar: '/path/to/jason.jpg',
    quote: 'Thanks to next-saas-stripe-starter, I\'ve been able to create modern and attractive user interfaces in record time. The starter kit provides a solid foundation for building sleek and intuitive designs, allowing me to focus more on the creative aspects of my work.',
    gridSize: { xs: 12, sm: 6, md: 4 }
  }
];

const TestimonialsSection = () => {
  return (
    <Box sx={{ bgcolor: '#111', color: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gap: 3, 
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(12, 1fr)'
          }
        }}>
          {/* First row */}
          <Box sx={{ 
            gridColumn: { xs: '1', sm: '1', md: 'span 4' },
            gridRow: { md: 'span 2' }
          }}>
            <TestimonialCard testimonial={testimonials[0]} />
          </Box>
          
          <Box sx={{ 
            gridColumn: { xs: '1', sm: '2', md: 'span 4' },
            gridRow: { md: 'span 1' }
          }}>
            <TestimonialCard testimonial={testimonials[1]} />
          </Box>
          
          <Box sx={{ 
            gridColumn: { xs: '1', sm: '1 / span 2', md: 'span 4' },
            gridRow: { md: 'span 2' }
          }}>
            <TestimonialCard testimonial={testimonials[2]} />
          </Box>
          
          {/* Second row */}
          <Box sx={{ 
            gridColumn: { xs: '1', sm: '2', md: '5 / span 4' },
            gridRow: { md: '2' }
          }}>
            <TestimonialCard testimonial={testimonials[3]} />
          </Box>
          
          {/* Third row */}
          <Box sx={{ 
            gridColumn: { xs: '1', sm: '1', md: 'span 4' },
            gridRow: { md: 'span 2' }
          }}>
            <TestimonialCard testimonial={testimonials[4]} />
          </Box>
          
          <Box sx={{ 
            gridColumn: { xs: '1', sm: '2', md: 'span 4' },
            gridRow: { md: 'span 1' }
          }}>
            <TestimonialCard testimonial={testimonials[5]} />
          </Box>
          
          <Box sx={{ 
            gridColumn: { xs: '1', sm: '1 / span 2', md: '5 / span 4' },
            gridRow: { md: 'span 2' }
          }}>
            <TestimonialCard testimonial={testimonials[6]} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Separate component for the testimonial card
const TestimonialCard = ({ testimonial }) => {
  return (
    <Card 
      sx={{ 
        bgcolor: '#222', 
        color: 'white', 
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={testimonial.avatar} 
            alt={testimonial.name}
            sx={{ width: 48, height: 48, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#aaa' }}>
              {testimonial.position}
            </Typography>
          </Box>
        </Box>
        <Typography 
          variant="body2" 
          component="p" 
          sx={{ 
            mt: 2, 
            color: '#ccc',
            fontStyle: 'italic',
            '&::before': {
              content: '"""',
              fontSize: '1.2rem',
            },
            '&::after': {
              content: '"""',
              fontSize: '1.2rem',
            }
          }}
        >
          {testimonial.quote}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TestimonialsSection;