import { GroupModel } from '../schemas/group.js';
import { ObjectId } from 'mongodb';
// import { GroupJoinModel } from '../schemas/groupJoin.js';
// import { UserModel } from '../schemas/user.js';

class Group {
  //그룹생성
  static async create({ newGroup }) {
    const createdNewGroup = await GroupModel.create(newGroup);
    return createdNewGroup;
  }
  //유저의 그룹 가입
  static async findById({ groupId }) {
    console.log('groupId', groupId);
    const group = await GroupModel.findOne({ id: groupId });
    console.log('1group:', group);

    return group;
  }
  //그룹 상세조회
  static async findBygroupId(id) {
    const mygroup = await GroupModel.findById(id).populate('groupOwnerId');
    return mygroup;
  }
  //그룹 목록 조회
  static async findGroupList() {
    const groupAllInfo = await GroupModel.find({});
    return groupAllInfo;
  }
  //대기자조회
  static async findBygroupIdAndState({ groupId, state }) {
    const groupJoinready = await GroupModel.find({
      groupId: groupId,
      state: '대기',
      // $and: [{ id }, { state: '대기' }],
    });
    return groupJoinready;
  }

  static async update({ groupId }) {
    const filter = { _id: new ObjectId(groupId) };
    const update = { state: '승인' };
    const option = { returnOriginal: false };

    const updatedGroup = await GroupModel.findOneAndUpdate(filter, update, option);
    return updatedGroup;
  }
  //그룹장이 그룹 삭제 시 
  static async deleteById({ groupId }) {
    const deleteResult = await GroupModel.deleteOne({ _id: groupId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Group };
