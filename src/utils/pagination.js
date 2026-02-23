const paginate = async (model, filterObject, options, page, limit) => {
  const skip = (page - 1) * limit;
  const [data, totalDocuments] = await Promise.all([
    model.find(filterObject)
      .sort(options.sort)
      .select(options.select)
      .populate(options.populate)
      .skip(skip)
      .limit(limit),
    model.countDocuments(filterObject)
  ]);

  const totalPages = Math.ceil(totalDocuments / limit);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  return {
    data,
    pagination: {
      totalDocuments,
      page,
      limit,
      totalPages,
      hasPrev,
      hasNext
    }
  };
};

module.exports = paginate;
