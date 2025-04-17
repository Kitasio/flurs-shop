export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  details: string[];
  sizes: {
    name: string;
    dimensions: string;
  }[];
}

export const products: Product[] = [
  {
    id: 'black-boots',
    name: 'BLACK BOOTS',
    price: 35.00,
    image: 'https://btcpay.flurs.art/Storage/0ba7c95c-dab9-4fce-b099-1667fc2baf29',
    description: 'Limited edition art print.',
    details: [
      'Poster "Black Boots". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'the-velvet',
    name: 'THE VELVET',
    price: 35.00,
    image: 'https://btcpay.flurs.art/Storage/7759b1a7-58e1-4b4f-aa3a-804c0bbd7950',
    description: 'Limited edition art print.',
    details: [
      '"The Velvet" is a poster from the series "Circus". Created by liquid watercolours and printed on 180g mat poster paper.',
      'All prints come carefully inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'cheerful-guy',
    name: 'CHEERFUL GUY',
    price: 35.00,
    image: 'https://btcpay.flurs.art/Storage/c44937c5-ec67-4d1c-8447-58b5b62a6ed0',
    description: 'Limited edition art print.',
    details: [
      '"Cheerful Guy" is a poster from the series "Circus". Created by liquid watercolours and printed on 180g mat poster paper.',
      'All prints come carefully inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'red-faced',
    name: 'RED-FACED',
    price: 35.00,
    image: 'https://btcpay.flurs.art/Storage/20f6607f-b2bf-4625-a194-3e70ae50bf84',
    description: 'Limited edition art print.',
    details: [
      '"Red-Faced" is a poster from the series "Circus". Created by liquid watercolours and printed on 180g mat poster paper.',
      'All prints come carefully inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'midnight-dance',
    name: 'MIDNIGHT DANCE',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9',
    description: 'Limited edition art print.',
    details: [
      'Poster "Midnight Dance". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'urban-rhythm',
    name: 'URBAN RHYTHM',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978018-3199d0cc2738',
    description: 'Limited edition art print.',
    details: [
      'Poster "Urban Rhythm". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'abstract-flow',
    name: 'ABSTRACT FLOW',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978731-324d40a0bd04',
    description: 'Limited edition art print.',
    details: [
      'Poster "Abstract Flow". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'color-burst',
    name: 'COLOR BURST',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978768-3a7b63e2d832',
    description: 'Limited edition art print.',
    details: [
      'Poster "Color Burst". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'gentle-waves',
    name: 'GENTLE WAVES',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978794-b62ff0b14f9e',
    description: 'Limited edition art print.',
    details: [
      'Poster "Gentle Waves". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'urban-pulse',
    name: 'URBAN PULSE',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978818-51e45e9a61e9',
    description: 'Limited edition art print.',
    details: [
      'Poster "Urban Pulse". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'neon-dreams',
    name: 'NEON DREAMS',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978844-59665643f706',
    description: 'Limited edition art print.',
    details: [
      'Poster "Neon Dreams". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'cosmic-dance',
    name: 'COSMIC DANCE',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978870-4e872c5c0ec6',
    description: 'Limited edition art print.',
    details: [
      'Poster "Cosmic Dance". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'fluid-motion',
    name: 'FLUID MOTION',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978896-cd5637f60a39',
    description: 'Limited edition art print.',
    details: [
      'Poster "Fluid Motion". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  },
  {
    id: 'urban-echo',
    name: 'URBAN ECHO',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1578301978922-69d0ddb301c5',
    description: 'Limited edition art print.',
    details: [
      'Poster "Urban Echo". Created with liquid watercolor painting and printed on 180g mat poster paper.',
      'All prints come carefully wrapped inside a tough postage mailer or tube.',
      '*Please note, prints do not come with frame.'
    ],
    sizes: [
      { name: 'A4', dimensions: '210 x 297mm' },
      { name: 'A3', dimensions: '297 x 420mm' },
      { name: 'A2', dimensions: '420 x 594mm' }
    ]
  }
];