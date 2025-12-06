"use client"
import { Table } from "@/lib/types"
import axios from "axios"
import { useState,useEffect } from "react"
export default function AdminTables(){
  const [tables, setTables] = useState<Table[]>([])
  const [newTable, setNewTable] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [loading,setLoading]=useState(false)

  const sendData=async()=>{
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/addTable`,{tid:tables[tables.length-1]?.tid+1||1,tablename:newTable})
  }

  const deleteTable=async(tid:number)=>{
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/deleteTable/`+tid)
  }
  useEffect(()=>{const fetchTables=async()=>{
    setLoading(true)
    const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getTables`)
    setTables(res.data.tables)
    setLoading(false)
  }
  fetchTables()},[])

  const handleAddTable=() =>{
    if (newTable.trim()==="") return
    setTables([
      ...tables,
      {
        tid:tables[tables.length-1]?.tid+1 || 1,
        tablename:newTable,
      },
    ])
    sendData()
    setIsAdding(false)
  }

  const handleDeleteTable=(id:number) => {
    setTables(tables.filter((table)=>table.tid!==id))
    deleteTable(id)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Table Management</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Configure and manage your restaurant tables</p>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">Current Tables</h2>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {!isAdding?"Add New Table":"Cancel"}
            </button>
          </div>

          {isAdding && (
            <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-850">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-500 mb-4">Add New Table</h3>
              <div className="flex w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1">Table Name</label>
                <div className="w-full flex">
                  <input
                    type="text"
                    value={newTable}
                    onChange={(e) => setNewTable(e.target.value )}
                    className="w-3/5 mr-3 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter table name"
                  />
                  <div className="flex  justify-end">
                  <button
                    onClick={() => setIsAdding(false)}
                    className="px-4 mr-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTable}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Table
                  </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!loading?(
            tables.length>0?(
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {tables.map((table) => (
                      <tr key={table.tid}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {table.tid}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          {table.tablename}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteTable(table.tid)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ):(
              <div className="text-center p-6">
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                  No tables have been added yet
                </div>
              </div>
            )
          ):(
            <div className="p-4">
                <div className="flex justify-center items-center">
                  <div className="processing-icon-container">
                    <svg
                      className="animate-spin"
                      width="50px"
                      height="50px"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>processing</title>
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="invisible_box" data-name="invisible box">
                          <rect width="48" height="48" fill="none" />
                          <rect width="48" height="48" fill="none" />
                          <rect width="48" height="48" fill="none" />
                        </g>
                        <g id="Q3_icons" data-name="Q3 icons">
                          <g>
                            <path d="M25.4,5.5a1.9,1.9,0,0,0-2.8.2,2,2,0,1,0,2.8-.2Z" />
                            <path d="M31.5,8.4a2.2,2.2,0,0,0,.2,3.1,2.3,2.3,0,1,0,3-3.4A2.2,2.2,0,0,0,31.5,8.4Z" />
                            <path d="M41.9,19.2a2.7,2.7,0,1,0-3.9.3A2.7,2.7,0,0,0,41.9,19.2Z" />
                            <path d="M42,27.6a3.5,3.5,0,1,0-4.5,5.3A3.5,3.5,0,0,0,42,27.6Z" />
                            <path d="M26.1,37.1a4.5,4.5,0,1,0,6.3-.5A4.4,4.4,0,0,0,26.1,37.1Z" />
                            <path d="M9.9,34.3a5.1,5.1,0,0,0,.5,7.1,5,5,0,1,0-.5-7.1Z" />
                            <circle cx="7.2" cy="22.1" r="5.5" transform="matrix(1, -0.08, 0.08, 1, -1.68, 0.62)" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
          )}

        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Tables: {tables.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
