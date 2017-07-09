import * as mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: String,
  sender: String,
  receiver: String,
  date: Date
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
