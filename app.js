import { app, initExpress, notFound } from './config/express.js';
import { mongooseConnect } from './config/mongoose.js';
import { Campground, campgroundSchema } from './models/campGround.js';

mongooseConnect();
initExpress();

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(detail => detail.message).join(',');
    throw new Error(msg);
  }
  next();
}

app.get('/', (req, res) => {
  res.redirect('/campgrounds');
});

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/create', (req, res) => {
  res.render('campgrounds/create');

});

app.get('/campgrounds/:id', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/show', { campground });
});

app.post('/campgrounds', validateCampground, async (req, res) => {
  try {
    const campground = new Campground(req.body);
    await campground.save();
    // res.redirect(`/campgrounds/${campground._id}`);
    res.send(campground);
  }
  catch (e) {
    console.dir(e);
    const errMsg = e || 'エラーが発生しました';
    return errMsg;
  }
});

app.get('/campgrounds/:id/edit', async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', validateCampground, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body });
  res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
});

app.use((err, req, res, next) => {
  res.status(500).send({ errMsg: err.message });
});

notFound();
