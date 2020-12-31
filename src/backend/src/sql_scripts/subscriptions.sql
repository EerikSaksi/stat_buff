CREATE FUNCTION notify_message_inserted()
  RETURNS TRIGGER AS $$
  BEGIN
    perform pg_notify(
      'postgraphile:message',
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
