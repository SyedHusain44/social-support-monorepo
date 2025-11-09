const locations = {
  countries: [
    {
      code: 'AE',
      names: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
      states: [
        {
          code: 'DU',
          names: { en: 'Dubai', ar: 'دبي' },
          cities: [
            { code: 'DXB', names: { en: 'Dubai', ar: 'دبي' } },
            { code: 'JBR', names: { en: 'Jumeirah', ar: 'جميرا' } },
          ],
        },
      ],
    },
    {
      code: 'IN',
      names: { en: 'India', ar: 'الهند' },
      states: [
        {
          code: 'DL',
          names: { en: 'Delhi', ar: 'دلهي' },
          cities: [
            { code: 'ND', names: { en: 'New Delhi', ar: 'نيو دلهي' } },
            { code: 'DW', names: { en: 'Dwarka', ar: 'دواركا' } },
          ],
        },
        {
          code: 'MH',
          names: { en: 'Maharashtra', ar: 'مهاراشترا' },
          cities: [
            { code: 'MB', names: { en: 'Mumbai', ar: 'مومباي' } },
            { code: 'PU', names: { en: 'Pune', ar: 'بوني' } },
          ],
        },
      ],
    },
  ],
};

export default locations;
