CREATE FUNCTION notify_message_inserted()
  RETURNS TRIGGER AS $$
  BEGIN
    perform pg_notify(
      format('postgraphile:event_%s', NEW.groupName),
      json_build_object(
        '__node__', json_build_array(
          'chat_messages', 
          NEW.id
        )
      )::text
    ); 
    return new;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_message_inserted_on_insert
after insert on "chat_message"
FOR EACH ROW 
EXECUTE PROCEDURE notify_message_inserted();

CREATE FUNCTION notify_workout_inserted()
  RETURNS TRIGGER AS $$
  BEGIN
    perform pg_notify(
      format('postgraphile:event_%s', NEW.groupName),
      json_build_object(
        '__node__', json_build_array(
          'workouts', 
          NEW.id
        )
      )::text
    ); 
    return new;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_workout inserted_on_insert
after insert on "workout"
FOR EACH ROW 
EXECUTE PROCEDURE notify_workout_inserted();

CREATE FUNCTION notify_user_exercise_inserted()
  RETURNS TRIGGER AS $$
  BEGIN
    perform pg_notify(
      format('postgraphile:event_%s', NEW.groupName),
      json_build_object(
        '__node__', json_build_array(
          'user_exercises', 
          json_build_array(NEW.slug_name, NEW.username)
        )
      )::text
    ); 
    return new;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_user_exercise inserted_on_insert
after insert on "user_exercise"
FOR EACH ROW 
EXECUTE PROCEDURE notify_user_exercise_inserted();
