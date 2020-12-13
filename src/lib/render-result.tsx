import * as React from "react";
import { ApolloError, QueryResult } from "@apollo/client";

const isEmpty = (data: NonNullable<QueryResult["data"]>): boolean => {
  const dataValue = data[Object.keys(data)[0]];
  return (
    dataValue === null || (Array.isArray(dataValue) && dataValue.length === 0)
  );
};

const successSelector = <T extends NonNullable<QueryResult["data"]>>(
  data: T
): T => data;

export const renderResult = <T extends QueryResult, U>(
  result: T,
  options: {
    isEmpty?: (data: NonNullable<T["data"]>) => boolean;
    successSelector?: (data: NonNullable<T["data"]>) => U;
    Loading: React.FC;
    Failure: React.FC<{ error: ApolloError }>;
    Empty: React.FC;
    Success: React.FC<{ data: U }>;
  }
): React.ReactElement => {
  return result.loading ? (
    <options.Loading />
  ) : result.error ? (
    <options.Failure error={result.error} />
  ) : (options.isEmpty ?? isEmpty)(result.data) ? (
    <options.Empty />
  ) : (
    <options.Success
      data={(options.successSelector ?? successSelector)(result.data)}
    />
  );
};
