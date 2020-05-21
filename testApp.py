
from model import TaskApp

app = TaskApp(__name__)

app.run("0.0.0.0", 5000, True)
