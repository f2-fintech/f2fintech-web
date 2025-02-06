/* eslint-disable no-case-declarations */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { displayToast } from "../../redux/actions/ToastAction";
import { parseISO, isValid, formatDistanceToNow, format } from "date-fns";
import API from "../../apis";

export const Utility = () => {
  /** Formats an image name by appending a random number and removing special characters.
   * @param {string} name - The original image name.
   * @returns {string} - The formatted image name.
   */
  const formatName = (name) => {
    const formattedName = name
      .toLowerCase()
      .trim()
      .replace(/[!@#$%^&*();:'"`~`'$]/g, "")
      .replace(/\s+/g, "_");
    return formattedName;
  };

  /** Uploads a file to S3 and creates a document in the database.
   * @param {File} file - The file to be uploaded.
   * @param {string} type - The document type or folder name.
   * @returns {void}
   */
  const uploadFileToS3 = (file, type, customerId = null) => {
    const formattedName = formatName(file.name);
    return API.DocumentAPI.uploadDocument({
      document: file,
      folder: `document/${formattedName}`,
    })
      .then((res) => {
        if (res.data.status === "Success") {
          return API.DocumentAPI.createDocument({
            document_url: res.data.data,
            customer_id: customerId,
            type: type,
          }).then(() => {
            console.log(`Document of ${type} uploaded successfully`);
          });
        } else {
          console.log("Upload failed");
          throw new Error("Upload failed");
        }
      })
      .catch((err) => {
        console.error("Error in document upload or creation:", err);
        throw err; // Rethrow the error for proper handling
      });
  };

  /** Gets the value associated with a key from local storage.
   * @param {string} key - The key for which to retrieve the value from local storage.
   * @returns {any|null} - The value associated with the key, or null if the key is not found.
   */
  const getLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    if (
      typeof storedValue !== "undefined" &&
      storedValue !== null &&
      storedValue !== "undefined"
    ) {
      return JSON.parse(storedValue);
    }
    return null;
  };

  /** Removes a key-value pair from local storage.
   * @param {string} key - The key to be removed from local storage.
   * @returns {void} - This function does not return any value.
   */
  const remLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.log(`Error removing ${key} from localStorage:`, err);
    }
  };

  /** Sets a key-value pair in the local storage.
   * @param {string} key - The key to be set in local storage.
   * @param {any} value - The value associated with the key.
   * @returns {void} - This function does not return any value.
   */
  const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log(`Error setting ${key} in localStorage:`, err);
    }
  };

  /** Displays a toast alert, sets its severity and message, and navigates to a specified path (optional) after a delay.
   * @param {function} dispatch - The Redux dispatch function.
   * @param {boolean} display - Whether to display the toast alert.
   * @param {string} severity - The severity level of the toast alert (e.g., 'success', 'info', 'warning', 'error').
   * @param {string} msg - The message to be displayed in the toast alert.
   * @param {function} navigateTo - The navigation function to be called after the delay.
   * @param {string|null} path - The optional path to navigate to after hiding the toast alert.
   * @returns {void} - This function does not return any value.
   */
  const toastAndNavigate = (
    dispatch,
    display,
    severity,
    msg,
    navigateTo = () => {},
    path = null,
    reload = false,
    callback = () => {}
  ) => {
    dispatch(
      displayToast({
        toastAlert: display,
        toastSeverity: severity,
        toastMessage: msg,
      })
    );

    setTimeout(() => {
      dispatch(
        displayToast({
          toastAlert: !display,
          toastSeverity: "",
          toastMessage: "",
        })
      );
      callback();
      if (path) {
        navigateTo(path);
        if (reload) {
          location.reload();
        }
      }
    }, 2000);
  };

  const capitalizeFirstLetter = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1).toLowerCase();
  };

  const groupNotificationsByDate = (notifications) => {
    const now = new Date();

    const formatCustomDate = (date) => {
      const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      if (diffInDays < 1) return "Today";
      if (diffInDays === 1) return "Yesterday";
      if (diffInDays < 7) return `${diffInDays} days ago`;
      return format(date, "MMM d, yyyy");
    };

    return notifications.reduce((grouped, notif) => {
      const parsedDate = parseISO(notif.created_at);

      if (!isValid(parsedDate)) {
        console.error("Invalid date encountered:", notif.created_at);
        return grouped;
      }

      const formattedDate = formatCustomDate(parsedDate);

      if (!grouped[formattedDate]) grouped[formattedDate] = [];
      grouped[formattedDate].push(notif);

      return grouped;
    }, {});
  };

  return {
    capitalizeFirstLetter,
    formatName,
    uploadFileToS3,
    getLocalStorage,
    remLocalStorage,
    setLocalStorage,
    toastAndNavigate,
    groupNotificationsByDate,
  };
};
