import Message from "../models/message.js";

var controller = {
  save: (req, res) => {
    var params = req.body;
    var message = new Message();
    message.message = params.message;
    message.from = params.from;

    message.save((error, messageStored) => {
      if (error || !messageStored) {
        return res.status(404).send({
          status: "error",
          message: "Error saving message",
        });
      }

      return res.status(200).send({
        status: "success",
        messageStored,
      });
    });
  },

  // get all messages

  getMessages: (req, res) => {
    var query = Message.find({});
    query.sort("-_id").exec((error, messages) => {
      if (error) {
        return res.status(404).send({
          status: "error",
          message: "Error extracting messages",
        });
      }
      return res.status(200).send({
        status: "success",
        messages,
      });
    });
  },
};

export default controller

// export const save = async (req, res) => {
//   try {
//     const {message, from} = req.body;

//     const newMsg = new Message({message, from});
//     await newMsg.save();

//     res.status(200).json(newMsg);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getAll = async (req, res) => {
//   try {
//     const messages = await Message.find({});

//     console.log('mensajes =>', messages)
//     res.status(200).json(messages);
//   } catch (err) {
//     return res.status(400).json(err.message);
//   }
// };
