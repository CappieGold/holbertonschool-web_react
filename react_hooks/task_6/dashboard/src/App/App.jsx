import { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';
import { APP_ACTIONS, appReducer, initialState } from './appReducer';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
  notifications: `${API_BASE_URL}/notifications.json`,
};

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
    console.log(`Notification ${id} has been marked as read`);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(ENDPOINTS.notifications);
        const notificationsList = (response.data.notifications || response.data).map((notif) => {
          if ((!notif.value && !notif.html) || notif.id === 3) {
            return { ...notif, html: { __html: getLatestNotification() } };
          }
          return notif;
        });
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: notificationsList });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(ENDPOINTS.courses);
        const coursesList = response.data.courses || response.data;
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: coursesList });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (state.user.isLoggedIn) {
      fetchCourses();
    }
  }, [state.user.isLoggedIn]);

  return (
    <div className="relative px-3 min-h-screen flex flex-col">
      <Notifications
        notifications={state.notifications}
        displayDrawer={state.displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <>
        <Header user={state.user} logOut={logOut} />
        {!state.user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={state.courses} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </>
      <Footer user={state.user} />
    </div>
  );
}
