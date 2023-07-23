export enum STAGES {
  INIT = 'INIT',
  CONNECT = 'CONNECT',
  SETTING = 'SETTING',
  MATCHMAKING = 'MATCHMAKING',
  GAME = 'GAME',
}

export enum CONNECT {
  ESTABLISH = 'ESTABLISH',
  PLAYER = 'PLAYER',
}

export enum SETTING {
  SET_SHIP = 'SET_SHIP',
  UNSET_SHIP = 'UNSET_SHIP',
  RANDOMIZE_BOARD = 'RANDOMIZE_BOARD',
  RESET_BOARD = 'RESET_BOARD',
}

export enum GAME {
  TOGGLE_MODE = 'TOGGLE_MODE',
  SET_ROOM_ID = 'SET_ROOM_ID',
  EXIT_INVITED = 'EXIT_INVITED',
  RESET_FULL = 'RESET_FULL',
  RESET = 'RESET',
  SET_PLAYER_BOARD = 'SET_PLAYER_BOARD',
  SET_ENEMY_BOARD = 'SET_ENEMY_BOARD',
  SET_TURN_ID = 'SET_TURN_ID',
  TURN_CHANGE = 'TURN_CHANGE',
}