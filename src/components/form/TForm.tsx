"use client";

import { ReactNode, useEffect } from "react";
import { FieldValues, FormProvider, Resolver, SubmitHandler, useForm } from "react-hook-form";

type TFromProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  resolver?: Resolver<FieldValues>;
  defaultValues?: Record<string, any>;
};

type TFromConfig = {
  resolver?: Resolver<FieldValues>;
  defaultValues?: Record<string, any>;
};

const TForm = ({ children, onSubmit, resolver, defaultValues }: TFromProps) => {
  const formConfig: TFromConfig = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);
  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods?.handleSubmit(submitHandler)}>{children}</form>
    </FormProvider>
  );
};

export default TForm;
