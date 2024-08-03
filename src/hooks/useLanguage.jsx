import { useState } from "react";
import { getItem, setItem } from "../gateway/localStorage";

const languages = {
  english: "en",
  ukrainian: "ua",
};

const archive = {
  Delete: {
    [languages.english]: "Delete",
    [languages.ukrainian]: "Видалити",
  },

  Create: {
    [languages.english]: "Create",
    [languages.ukrainian]: "Створити",
  },

  Today: {
    [languages.english]: "Today",
    [languages.ukrainian]: "Сьогодні",
  },

  Title: {
    [languages.english]: "Title",
    [languages.ukrainian]: "Заголовок",
  },

  Description: {
    [languages.english]: "Description",
    [languages.ukrainian]: "Описання",
  },

  UA: {
    [languages.english]: "UA",
    [languages.ukrainian]: "Укр",
  },

  EN: {
    [languages.english]: "EN",
    [languages.ukrainian]: "Анг",
  },

  January: {
    [languages.english]: "January",
    [languages.ukrainian]: "Січень",
  },

  February: {
    [languages.english]: "February",
    [languages.ukrainian]: "Лютий",
  },

  March: {
    [languages.english]: "March",
    [languages.ukrainian]: "Березнь",
  },

  April: {
    [languages.english]: "April",
    [languages.ukrainian]: "Квітень",
  },

  May: {
    [languages.english]: "May",
    [languages.ukrainian]: "Травень",
  },

  June: {
    [languages.english]: "June",
    [languages.ukrainian]: "Червень",
  },

  July: {
    [languages.english]: "July",
    [languages.ukrainian]: "Липень",
  },

  August: {
    [languages.english]: "August",
    [languages.ukrainian]: "Серпень",
  },

  September: {
    [languages.english]: "September",
    [languages.ukrainian]: "Вересень",
  },

  October: {
    [languages.english]: "October",
    [languages.ukrainian]: "Жовтень",
  },

  November: {
    [languages.english]: "November",
    [languages.ukrainian]: "Листопад",
  },

  December: {
    [languages.english]: "December",
    [languages.ukrainian]: "Грудень",
  },

  Sun: {
    [languages.english]: "Sun",
    [languages.ukrainian]: "Вс",
  },

  Mon: {
    [languages.english]: "Mon",
    [languages.ukrainian]: "Пн",
  },

  Tue: {
    [languages.english]: "Tue",
    [languages.ukrainian]: "Вт",
  },

  Wed: {
    [languages.english]: "Wed",
    [languages.ukrainian]: "Ср",
  },

  Thu: {
    [languages.english]: "Thu",
    [languages.ukrainian]: "Чт",
  },

  Fri: {
    [languages.english]: "Fri",
    [languages.ukrainian]: "Пт",
  },

  Sat: {
    [languages.english]: "Sat",
    [languages.ukrainian]: "Сб",
  },
};

export const useLanguage = () => {
  const [language, setLanguage] = useState(
    getItem("language", languages.english),
  );

  const changeLanguage = () => {
    let nextLanguage =
      language === languages.english ? languages.ukrainian : languages.english;
    setItem("language", nextLanguage);
    setLanguage(nextLanguage);
  };

  const translation = (key) => archive[key][language];

  return {
    translation,
    changeLanguage,
    selectedLanguage: language,
    isEnglish: language === languages.english,
  };
};
