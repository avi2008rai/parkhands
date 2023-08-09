import argparse

IGNORE_ROLES = [
    "CREATE ROLE superuser;",
    "CREATE ROLE authenticator;",
    "CREATE ROLE postgres;"
]

APPEND_LINE = "CREATE ROLE authenticator WITH LOGIN PASSWORD 'authenticatorpass' NOINHERIT;"

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Execute python scripts')
    parser.add_argument('-f', '--file-name', help='Roles file', required=True)
    args = parser.parse_args()

    next_line = False

    with open(args.file_name,"r+") as f:
        new_f = f.readlines()
        f.seek(0)
        for line in new_f:
            if next_line:
                next_line = False
                continue
            if all(list(map(lambda x: x not in line, IGNORE_ROLES))):
                f.write(line)
            else:
                next_line = True
        f.truncate()

    with open(args.file_name, 'r+') as f:
            content = f.read()
            f.seek(0, 0)
            f.write(APPEND_LINE.rstrip('\r\n') + '\n' + content)
