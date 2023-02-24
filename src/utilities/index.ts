import React from "react";

export const parseQueryString = (search: string): Record<string, string> =>
  (search || '')
    .replace(/^\?/g, '')
    .split('&')
    .reduce((acc, query) => {
      const [key, value] = query.split('=');

      if (key) {
        acc[key] = decodeURIComponent(value);
      }

      return acc;
    }, {} as Record<string, string>);

export const checkLoginInput = (data: string, type: string): boolean => {
  const idReg = /^[A-Za-z0-9]*.{5,30}$/;
  const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/;
  if(type === 'id' && !idReg.test(data)) return false;
  if(type === 'password' && !passwordReg.test(data)) return false;
  return true;
}

export const convertComma = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}