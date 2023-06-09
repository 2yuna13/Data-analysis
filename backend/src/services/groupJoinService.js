import { GroupJoin } from '../db/models/GroupJoin.js';
import { User } from '../db/models/User.js';
import { Group } from '../db/models/Group.js';

class groupJoinService {
  // 유저의 그룹 가입
  static async groupJoin({ groupId, loginedId, state }) {
    const newGroupJoin = {
      groupId,
      loginedId,
      state,
    };

    const groupJoin = await GroupJoin.create({ newGroupJoin });
    return groupJoin;
  }

  static async getUserGroup({ loginedId }) {
    const group = await GroupJoin.findByUserId({ loginedId });
    return group;
  }

  // 유저 가입 대기 -> 승인으로 관리자 승인에 의한 상태 변경
  static async setJoinedGroup({ loginedId }) {
    const updatedGroup = await GroupJoin.update({ loginedId });
    return updatedGroup;
  }

  // 유저의 그룹 탈퇴
  static async deleteJoinedGroup({ loginedId }) {
    const isDataDeleted = await GroupJoin.deleteByLoginedId({ loginedId });

    if (!isDataDeleted) {
      const errorMessage = 'Group 탈퇴: 해당 id를 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return { status: 'ok' };
  }
}

export { groupJoinService };
