import struct
import sys
import threading
import queue as Queue

import ctypes
import psutil
import time

# Thread that reads messages from the webapp.
def read_thread_func(queue):
  while 1:
    # Read the message length (first 4 bytes).
    text_length_bytes = sys.stdin.buffer.read(4)

    if len(text_length_bytes) == 0:
      if queue:
        queue.put(None)
      sys.exit(0)

    # Unpack message length as 4 byte integer.
    text_length = struct.unpack('@I', text_length_bytes)[0]

    # Read the text (JSON object) of the message.
    text = sys.stdin.buffer.read(text_length).decode('utf-8')

    if text == '{"text":"exit"}':
      break

    if queue:
      queue.put(text)
    else:
      # In headless mode just send an echo message back.
      send_message('{"echo": %s}' % text)


# Helper function that sends a message to the webapp.
def send_message():
  text = '{"info": "' + str(get_active_window_process_info().get('process_name')) + '"}'
  #  Write message size.
  sys.stdout.buffer.write(struct.pack('I', len(text)))
  sys.stdout.write(text)
  sys.stdout.flush()


def get_active_window_process_info():
    user32 = ctypes.windll.user32
    w_handle = user32.GetForegroundWindow()
    pid = ctypes.c_ulong()
    user32.GetWindowThreadProcessId(w_handle, ctypes.byref(pid))
    process_id = pid.value
    process = psutil.Process(process_id)
    process_name = process.name()
    return {
        "process_id": process_id,
        "process_name": process_name,
    }
    
def main():
  queue = Queue.Queue()
  
  thread = threading.Thread(target=read_thread_func, args=(queue,))
  thread.daemon = True
  thread.start()
  while True:
    send_message()
    time.sleep(1)


if __name__ == '__main__':
  main()
