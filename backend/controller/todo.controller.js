import Todo from "../model/todo.model.js";


export const createTodo = async (req, res) => {

    const todo= new Todo({
        title: req.body.title,
        completed: req.body.completed,
        user: req.user._id // Associate the todo with the loggedin user
    });
    try {
        const newTodo =await  todo.save();
        res.status(201).json({ message: "Todo created successfully", newTodo });
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }

}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({user: req.user._id });
        res.status(200).json({ message: "Todos fetched successfully", todos });
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos", error });
    }
}

export const updateTodo = async (req, res) => {
   try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body,{
            new: true, // Return the updated document

      })
      res.status(200).json({ message: "Todo updated successfully", todo });
      
   } catch (error) {
     res.status(500).json({ message: "Error updating todos", error });
   }

}

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", todo });

  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
}
