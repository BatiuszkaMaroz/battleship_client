import React, { useEffect } from 'react';
import { setRoomId } from 'store/actions/game';
import useTypedSelector from 'shared/hooks/useTypedSelector';
import useSocket from 'shared/hooks/useSocket';
import { useDispatch } from 'react-redux';

const PrivateRoom: React.FC = () => {
  const dispatch = useDispatch();
  const { roomId, mode } = useTypedSelector((state) => state.game.mode);

  const { emitter, data } = useSocket<{
    roomId: string;
    message: string;
  }>('private');

  useEffect(() => {
    if (mode === 'private') {
      emitter();
    }
  }, [emitter, mode, roomId]);

  useEffect(() => {
    if (data.roomId) {
      dispatch(setRoomId(data.roomId));
    }
  }, [data, dispatch]);

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const textContent = e.currentTarget.textContent;
    navigator.clipboard.writeText(textContent || '');
  };

  return (
    <>
      {mode === 'private' && roomId && (
        <p
          onClick={handleClick}
        >{`${window.location.origin}/roomId/${roomId}`}</p>
      )}
    </>
  );
};

export default PrivateRoom;
