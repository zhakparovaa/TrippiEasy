const Country = require('../models/Country');
exports.seedDestinations = async (req, res) => {
  try {
    const sampleCountries = [
      { id: 'france', name: 'France', flag: '🇫🇷' },
      { id: 'japan', name: 'Japan', flag: '🇯🇵' },
      { id: 'italy', name: 'Italy', flag: '🇮🇹' },
      { id: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧' },
      { id: 'united-states', name: 'United States', flag: '🇺🇸' },
      { id: 'australia', name: 'Australia', flag: '🇦🇺' },
      { id: 'peru', name: 'Peru', flag: '🇵🇪' },
      { id: 'egypt', name: 'Egypt', flag: '🇪🇬' },
      { id: 'brazil', name: 'Brazil', flag: '🇧🇷' },
      { id: 'south-africa', name: 'South Africa', flag: '🇿🇦' },
    ];

    await Country.deleteMany({});

    const createdCountries = await Country.insertMany(sampleCountries);

    res.status(201).json(createdCountries);
  } catch (error) {
    console.error('Error seeding countries:', error);
    res.status(500).json({ message: 'Failed to seed countries', error: error.message });
  }
};
