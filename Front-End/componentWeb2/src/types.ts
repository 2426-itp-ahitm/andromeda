export interface Model {
  name: string;
  size: string;
  progress: string;
  status: 'download' | 'on' | 'off';
}

export interface Command {
  text: string;
  type: string;
}

