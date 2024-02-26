import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

function TodoList() {
    const [todos, getTodos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/gettodo").then((res) => {
            getTodos(res);
            console.log(todos);
        }).catch((err) => console.log(err))
    })
    
    return (
        <div>
            {todos.map((e, index) => {
                <div className="flex space-x-2 mr-3 ml-3 mb-5">
                    <Card
                        key={index}
                        className="flex items-center justify-center overflow-hidden shadow-lg shadow-blue-grey-500/20 max-h-11"
                    >
                        <CardContent className=" w-80">
                            <p className="mt-5 capitalize">{e.todo}</p>
                        </CardContent>
                    </Card>
                    <Button className="overflow-hidden shadow-lg shadow-blue-grey-500/20">
                        <Trash2 />
                    </Button>
                </div>;
            })}
        </div>
    )
}

export default TodoList
