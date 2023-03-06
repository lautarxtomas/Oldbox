export const decrementQuantity = async (cart) => {
    try {
      // build mongodb query
      const bulkOps = cart.map((item) => {
        return {
          updateOne: {
            filter: { _id: item._id },
            update: { $inc: { quantity: -1, sold: +1 } },
          },
        };
      });
      const updated = await Product.bulkWrite(bulkOps, {})
    } catch (err) {
      console.log(err);
    }
  };