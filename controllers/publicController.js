export const mainPage = (req, res) =>
  res.render('pages/index.ejs', {
    title: 'Exchange rates API',
    description:
      'A fast, lightweight and powerful exchange rates API with with additional features support. Focused on convenience, speed and reliability',
  });
