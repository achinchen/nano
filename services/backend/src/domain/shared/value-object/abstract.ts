export interface IValueObject<Input, Output> {
  execute(input?: Input): Promise<Output> | Output;
}
