import shopModel from "../models/shopModel.js";

const changeAvailablity = async (req, res) => {
  try {
    const { shopId } = req.body;

    const shopData = await shopModel.findById(shopId);

    await shopModel.findByIdAndUpdate(shopId, {
      available: !shopData.available,
    });

    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const shopList = async (req,res)=>{
    try {
        const shops = await shopModel.find({}).select(['-password','-email'])
        res.json({success:true,shops})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { changeAvailablity,shopList };
