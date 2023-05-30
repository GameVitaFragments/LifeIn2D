import csv

arr = []

with open("corners1.csv", "r") as f:
    file = csv.reader(f)
    for line in file:
        temp = []
        for num in line:
            temp.append(num)
        arr.append(temp)

corners = []
for i in range(len(arr)):
    for j in range(len(arr[i])):
        if arr[i][j] == "1":
            corners.append([i, j])

npc = []
for i in range(len(arr)):
    for j in range(len(arr[i])):
        if arr[i][j] == "6":
            npc.append([i, j])


startPos = []
for i in range(len(arr)):
    for j in range(len(arr[i])):
        if arr[i][j] == "4":
            startPos.append([i, j])

teleport = []
for i in range(len(arr)):
    for j in range(len(arr[i])):
        if arr[i][j] == "5":
            teleport.append([i, j])
print(npc)
print(startPos)
print(teleport)


chances = [
        [ 0, -1],
        [ 0,  1],
        [ 1,  0],
        [-1,  0]
]

def turns(arr, i, j):
    ret = []
    for c in chances:
        if arr[i + c[0]][j + c[1]] != "-1":
            ret.append(chances.index(c))
    return ret

found = []

i = 0
j = 0

iVel = 0
jVel = 0

visited = []

while len(found) != len(corners):
    if [i, j] not in visited:
        visited.append([i, j])
    i += iVel
    j += jVel


    while arr[i][j] != "1":
        if [i, j] not in visited:
            visited.append([i, j])
        i += iVel
        j += jVel

    if [i, j] not in found:
        found.append([i, j])

    poss = turns(arr, i, j)

    for p in poss:
        if [i + chances[p][0], j + chances[p][1]] not in visited:
            iVel = chances[p][0]
            jVel = chances[p][1]
            break

# [print(pos) for pos in found]
with open("corners3.csv", "w") as f:
    for pos in found:
        f.write(f"{pos[0]},{pos[1]}\n")


